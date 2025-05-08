import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ActionEnum, useModal } from "../../context/ModalProvider"
import Tippy from "@tippyjs/react"

export const Item = ({ item, length, index }) => {

    const { openModal } = useModal()

    return (
        <tr key={item._id}>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("border-l border-gray-300 px-2 py-1")}>
                {item.label}
            </td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("px-2 py-1")}>
                {item.type}
            </td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("px-2 py-1")}>
                {item.price} {item.currency}
            </td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("px-2 py-1")}>
                {item.unit}
            </td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("px-2 py-1")}>
                <Tippy content={
                    <div className="bg-white px-2 py-1 rounded-md border border-gray-300 w-min">{item.notes}</div>
                }>
                    <i className="fa-solid fa-circle-info text-gray-400"></i>
                </Tippy>
                
            </td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ("px-2 py-1 border-r border-gray-300")}>
                <button onClick={() => openModal(ActionEnum.ITEM_EDIT, item)} className="text-indigo-500 hover:underline" to={`/item/${item._id}/edit`}>Edit</button>
            </td>
            {/* <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? " rounded-bl-xl border-b border-l border-gray-300 " : "border-l border-gray-300 ") + ("px-2 py-1")}>{item.label}</td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? "border-b border-gray-300 " : "") + ("px-2 py-1")}>{item.type}</td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? "border-b border-gray-300 " : "") + ("px-2 py-1")}>{item.price} {item.currency}</td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? "border-b border-gray-300 " : "") + ("px-2 py-1")}>{item.unit}</td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? "border-b border-gray-300 " : "") + ("px-2 py-1")}><i className="fa-solid fa-circle-info text-gray-400"></i></td>
            <td className={(index % 2 === 0 ? "bg-white " : "bg-gray-100 ") + ((index === length - 1) ? "rounded-br-xl border-r border-b border-gray-300 " : "border-r border-gray-300 ") + ("px-2 py-1")}>
            <Link className="text-indigo-500 hover:underline" to={`/item/${item._id}/edit`}>Edit</Link>
            </td> */}
        </tr>
    )
}

export const ItemList = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { modal } = useModal()

    useEffect(() => {
        axios.get("/item").then((res) => {
            setItems(res.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isLoading, modal.active])

    const [newItemData, setNewItemData] = useState({ label: "", price: "", currency: "", notes: "", unit: "", type: "" })

    const handleCreateItem = () => {
        const priceFull = newItemData.price.split(" ")
        const price = parseFloat(priceFull[0])
        const currency = priceFull[1]

        setIsLoading(true)

        axios.post("/item", { ...newItemData, price, currency }).then((res) => {
            if(res.status === 201) {
                setNewItemData({label: "", price: "", currency: "", notes: "", unit: "", type: ""})
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    // const [openNote, setNewNote] = useState(false)

    return (
        <>
        {!isLoading && (
            <div className="w-full">
                {/* <pre>{JSON.stringify(newItemData, null, 4)}</pre> */}
                <table className="w-full table-auto text-center border-separate border-spacing-0 pb-4">
                    <thead>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm bg-gray-100 rounded-tl-xl border-t border-l border-gray-300">Label</th>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm bg-gray-100 border-t border-gray-300">Type</th>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm bg-gray-100 border-t border-gray-300">Price</th>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm bg-gray-100 border-t border-gray-300">Unit</th>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm bg-gray-100 border-t border-gray-300">Notes</th>
                        <th className="px-6 py-3 text-gray-800 uppercase text-sm rounded-tr-xl border-r bg-gray-100 border-t border-gray-300">Action</th>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <Item key={item._id} item={item} index={i} length={items.length} />
                        ))}
                        <tr>
                            <td className="p-3 bg-green-200 rounded-bl-xl border-l border-b border-gray-300">
                                <input value={newItemData.label} onChange={(e) => setNewItemData((prev) => ({ ...prev, label: e.target.value }))} className="px-2 py-0.5 text-center text-white placeholder:text-green-200 bg-green-400 w-full rounded-md" type="text" name="label" placeholder="Item Name" id="label" />
                            </td>
                            <td className="p-3 bg-green-200 border-b border-gray-300">
                                <input value={newItemData.type} onChange={(e) => setNewItemData((prev) => ({...prev, type: e.target.value}))} className="px-2 py-0.5 text-white text-center placeholder:text-green-200 bg-green-400 w-full rounded-md" type="text" name="type" placeholder="Type" id="type" />
                            </td>
                            <td className="p-3 bg-green-200 border-b border-gray-300">
                                <input value={newItemData.price} onChange={(e) => setNewItemData((prev) => ({ ...prev, price: e.target.value }))} className="px-2 py-0.5 text-center text-white placeholder:text-green-200 bg-green-400 w-full rounded-md" type="text" name="price" placeholder="200 CZK" id="price" />
                            </td>
                            <td className="p-3 bg-green-200 border-b border-gray-300">
                                <input value={newItemData.unit} onChange={(e) => setNewItemData((prev) => ({ ...prev, unit: e.target.value }))} className="px-2 py-0.5 text-center text-white placeholder:text-green-200 bg-green-400 w-full rounded-md" type="text" name="unit" placeholder="m2" id="unit" />
                            </td>
                            <td className="p-3 bg-green-200 border-b border-gray-300 text-green-600 hover:text-green-800">
                                <Tippy content={
                                    <div className="bg-white px-2 py-1 rounded-md border border-gray-300">This will be<br />added later in edit</div>
                                }>
                                    <i className="fa-solid fa-circle-info"></i>
                                </Tippy>
                            </td>
                            <td className="p-3 bg-green-200 border-b border-r rounded-br-xl border-gray-300">
                                <button onClick={() => handleCreateItem()} className="px-1.5 py-0.5 text-green-600 hover:text-green-800 w-full">
                                        <i className="fa-solid fa-circle-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
        </>
    )
}