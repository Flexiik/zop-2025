import { NavLink } from "react-router-dom"

const SidebarLink = ({ to, children }) => {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? "bg-indigo-200 w-12 h-12 transition-all duration-300 rounded-lg border-gray-300 border flex flex-row items-center justify-center" : "bg-gray-50 transition-all duration-300 rounded-lg border-gray-300 w-12 h-12 border flex flex-row items-center justify-center hover:bg-indigo-100"}>
            {children}
        </NavLink>
    )
}

export default SidebarLink