import axios from "axios"
import { useModal } from "../../context/ModalProvider"

export const ItemEdit = () => {

    const { modal, closeModal, setModal } = useModal()

    const deleteItem = () => {
        axios.delete(`/item/${modal.data._id}`).then((res) => {
            if(res.status === 200) {
                closeModal()
            }
        })
    }

    const updateLabel = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                label: e.target.value
            }
        }))
    }

    const updateType = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                type: e.target.value
            }
        }))
    }

    const updatePrice = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                price: parseFloat(e.target.value)
            }
        }))
    }

    const updateCurrency = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                currency: e.target.value
            }
        }))
    }

    const updateUnit = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                unit: e.target.value
            }
        }))
    }

    const updateNotes = (e) => {
        setModal((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                notes: e.target.value
            }
        }))
    }

    return (
        <div>
            {modal.data && (
                <div className="w-full flex flex-col gap-4">
                    {/* <pre>{JSON.stringify(modal.data, null, 4)}</pre> */}
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full flex flex-row items-center justify-between">
                            <label htmlFor="label">Label</label>
                            <button onClick={() => deleteItem()} className="text-sm/6 text-red-600 flex flex-row items-center gap-2">
                                Delete item
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <input value={modal.data.label} onChange={updateLabel} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="label" id="label" />
                    </div>
                    <div className="w-full flex flex-col gap-1">    
                        <label htmlFor="type">Type</label>
                        <input value={modal.data.type} onChange={updateType} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="type" id="type" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="price">Price</label>
                            <input value={modal.data.price} onChange={updatePrice} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="price" id="price" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="currency">Currency</label>
                            <input value={modal.data.currency} onChange={updateCurrency} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="currency" id="currency" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="unit">Unit</label>
                            <input value={modal.data.unit} onChange={updateUnit} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="unit" id="unit" />
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="notes">Notes</label>
                        <input value={modal.data.notes} onChange={updateNotes} type="text" className="py-1 px-3 rounded-lg border border-gray-300 bg-gray-50 w-full" name="notes" id="notes" />
                    </div>

                    <button className="border w-full hover:border-indigo-500 hover:text-indigo-500 hover:bg-white py-2 px-12 rounded-lg bg-indigo-500 text-white" onClick={() => closeModal()}>Save</button>
                </div>
            )}
        </div>
    )
}