import { NavLink, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./context/AuthProvider"
import { useTitle } from "./context/TitleProvider"
import SidebarLink from "./components/SidebarLink"

const Layout = () => {

    const { auth, logout } = useAuth()
    const { title } = useTitle()

    return (
        <>
        <main className="max-h-screen h-screen bg-zinc-50 w-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-br from-indigo-500 to-red-800 bg-clip-text text-transparent">{title}</h1>
            {/* <pre className="max-w-3xl">{JSON.stringify(location.pathname.split("/")[1], null, 4)}</pre> */}
            <div className="max-w-4xl w-full max-h-96 h-96 bg-white rounded-xl border border-gray-300 flex flex-row items-stretch">
                
                    <div className="max-w-24 p-6 rounded-l-xl border-r border-gray-300 w-full bg-gray-100 flex flex-col items-center justify-center gap-4">
                        <SidebarLink to="/">
                            <i className="fa-solid fa-home"></i>
                        </SidebarLink>
                        {auth.isAuth && (
                            <>
                        <SidebarLink to="/calculator">
                            <i className="fa-solid fa-calculator"></i>
                        </SidebarLink>
                        <SidebarLink to="/items">
                            <i className="fa-solid fa-list"></i>
                        </SidebarLink>
                        <button onClick={() => logout()} className="w-12 h-12 rounded-lg border-gray-300 bg-gray-50 border flex flex-row items-center justify-center hover:bg-red-100"><i className="fa-solid fa-door-open"></i></button>
                        </>)}
                        {!auth.isAuth && (
                            <SidebarLink to="/login">
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </SidebarLink>
                        )}
                        
                        
                    </div>
                
                <div className="flex-1 rounded-r-xl p-4 overflow-y-scroll flex items-stretch">
                    <Outlet />
                </div>
            </div>
        </main>
        </>
    )
}

export default Layout