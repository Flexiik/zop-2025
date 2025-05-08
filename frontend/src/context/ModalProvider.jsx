import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ItemEdit } from "../components/modal/ItemEdit";
import { NewsCreate } from "../components/modal/NewsCreate";
import axios from "axios";

export const ModalContext = createContext()

export const ActionEnum = {
    NONE: Symbol("none"),
    ITEM_EDIT: Symbol("item_edit"),
    NEWS_CREATE: Symbol("news_create")
}

export const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState({header: "", active: false, action: ActionEnum.NONE, data: null})
    const [lastModalData, setLastModalData] = useState(null)
    const [element, setElement] = useState(<></>)

    useEffect(() => {
        if(!modal.active) {
            setElement(<></>)
        }

        if(modal.active && modal.action === ActionEnum.ITEM_EDIT) {
            // setModal((prev) => ({...prev, header: "Item Edit"}))
            setElement(<ItemEdit />)
        }

        if(modal.active && modal.action === ActionEnum.NEWS_CREATE) {
            setElement(<NewsCreate />)
        }
    }, [modal])

    const openModal = (action, data) => {
        let newHeader = ""

        if(action === ActionEnum.ITEM_EDIT) {
            newHeader = "Edit Item"
        } else if(action === ActionEnum.NEWS_CREATE) {
            newHeader = "Create News"
        }

        setModal({ active: true, action, header: newHeader, data})
        setLastModalData(data)
    }

    const closeModal = async () => {
        if(modal.action === ActionEnum.ITEM_EDIT && lastModalData !== modal.data) {
            await axios.patch(`/item/${modal.data._id}`, modal.data)
        }
        setModal({ active: false, action: ActionEnum.NONE, header: "", data: null })
    }

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal, setModal }}>
            {modal.active && (
                <div>
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
                            <div className="bg-white max-w-xl w-full h-max rounded-xl border border-gray-300 p-4">
                                <header className="flex flex-row justify-between pb-3 border-b border-gray-300">
                                    <h1 className="text-sm/6 font-semibold uppercase">{modal.header}</h1>
                                    <button className="text-sm/6 font-semibold uppercase" onClick={() => closeModal()}>
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </header>
                                <div className="p-4">
                                    {element}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}

export default ModalProvider