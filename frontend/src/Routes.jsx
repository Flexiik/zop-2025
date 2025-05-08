import { Route, Routes } from "react-router-dom"
import App from "./App"
import Layout from "./Layout"
import AuthProvider from './context/AuthProvider'
import RequiresAuth from "./components/RequiresAuth"
import Login from "./pages/Auth/Login"
import TitleProvider from "./context/TitleProvider"
import Register from "./pages/Auth/Register"
import NoAuth from "./components/NoAuth"
import { ItemList } from "./pages/Items/ItemList"
import NotFound from "./pages/Error/NotFound"
import ModalProvider from "./context/ModalProvider"
import { Calculator } from "./pages/Calculator/Calculator"

const RoutesBody = () => {
    return (
        <AuthProvider>
            <TitleProvider>
                <ModalProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<App />} />
                            <Route path="/login" element={<NoAuth><Login /></NoAuth>} />
                            <Route path="/calculator" element={<RequiresAuth><Calculator /></RequiresAuth>} />
                            <Route path="/items" element={<RequiresAuth><ItemList /></RequiresAuth>} />
                            <Route path="/register" element={<NoAuth><Register /></NoAuth>}/>
                            <Route path="*" element={<NotFound />}/>
                        </Route>
                    </Routes>
                </ModalProvider>
            </TitleProvider>
        </AuthProvider>
    )
}

export default RoutesBody