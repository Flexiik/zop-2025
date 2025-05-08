import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [message, setMessage] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)
    const [user, setUser] = useState(null)

    const encodedToken = localStorage.getItem("nms")
    const userId = localStorage.getItem("nmi")

    const navigate = useNavigate()

    const [auth, setAuth] = useState(
        encodedToken
        ? { token: encodedToken, isAuth: true, userId}
        : { token: "", isAuth: false}
    )

    useEffect(() => {
        if(auth.isAuth) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
            fetchUser()
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null)
        }
    }, [auth.isAuth, auth.token])

    const fetchUser = async () => {
        try {
            const response = await axios.get("/auth/user", {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            setUser(response.data)
            return response.data
        } catch (error) {
            console.error("Failed to fetch user:", error)
            return null
        }
    }

    const fetchUserWithToken = async (authToken) => {
        await axios.get('/auth/user').then((res) => {
            if (res.status === 200) {
                localStorage.setItem("nmi", res.data._id)
                return res.data._id
            } else {
                setMessage(res.data.message)
            }
        }).catch((e) => [
            setAuth({ token: "", isAuth: false })
        ]).finally(() => {
            setLoginLoading(false)
        })
        return null
    }

    const login = async (body) => {
        try {
            const response = await axios.post('/auth/login', body);
            const token = response.data;

            localStorage.setItem('nms', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userId = fetchUserWithToken(token)
            if(userId) {
                setAuth({ token: token, isAuth: true, userId })
                return { success: true };
            } else {
                return { success: false, message: "Login failed"}
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (body) => {
        try {
            const res = await axios.post('/auth/register', body)
            if (res.data.message) {
                setMessage(res.data.message)
            } else {
                const token = res.data

                localStorage.setItem('nms', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userId = fetchUserWithToken(token)
                if (userId) {
                    setAuth({ token: token, isAuth: true, userId })
                    return { success: true };
                } else {
                    return { success: false, message: "Login failed" }
                }
            }
        } catch (e) {
            return { success: false, message: 'Invalid registration' };
        }
    }

    const logout = () => {
        localStorage.removeItem('nms');
        delete axios.defaults.headers.common['Authorization'];
        setAuth({ token: "", isAuth: false })
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ auth, user, message, loginLoading, login, logout, setMessage, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider