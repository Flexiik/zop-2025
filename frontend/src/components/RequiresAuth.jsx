import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const RequiresAuth = ({ children }) => {

    const { auth } = useAuth()

    const location = useLocation()

    return auth.isAuth ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    )
}

export default RequiresAuth