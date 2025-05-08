import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import { useState } from "react"

const Login = () => {

    const { login } = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const res = await login({ username: username.toLowerCase(), password })
        if(res.success) {
            navigate("/", {replace: true})
        }
    }

    return (
        <>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg" placeholder="tonda123" type="text" name="username" id="username" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg" placeholder="tajneHeslo1" type="password" name="password" id="password" />
            </div>
            <button className="border hover:border-indigo-500 hover:text-indigo-500 hover:bg-white w-max py-1 px-12 rounded-lg bg-indigo-500 text-white" onClick={() => handleLogin()}>Login</button>
            <a href="/register" className="text-indigo-300 hover:text-indigo-500">Register</a>
        </div>
        </>
    )
}

export default Login