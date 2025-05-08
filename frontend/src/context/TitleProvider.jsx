import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const TitleContext = createContext()

export const TitleProvider = ({ children }) => {

    const [title, setTitle] = useState("")

    function titleCase(str) {
        str = str.toLowerCase();
        str = str.split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    const location = useLocation()

    useEffect(() => {
        const newTitle = titleCase(location.pathname.split('/')[1]) !== "" ? titleCase(location.pathname.split('/')[1]) : "News";
        setTitle(newTitle)
    })

    return (
        <TitleContext.Provider value={{ title }}>
            {children}
        </TitleContext.Provider>
    )
}

export const useTitle = () => {
    return useContext(TitleContext)
}

export default TitleProvider