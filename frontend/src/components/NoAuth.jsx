import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const NoAuth = ({ children }) => {
    const { auth } = useAuth()
    // const location = useLocation()
    return auth.isAuth ? (
        <Navigate to="/" />
    ) : (
        children
    )
}

export default NoAuth