import { useEffect, useState } from "react"
import axios from "axios"

export const Calculator = () => {

    const [availableItems, setAvailableItems] = useState([])
    const [items, setItems] = useState([])
    const [sections, setSections] = useState([])
    const [footerData, setFooterData] = useState({})

    useEffect(() => {
        axios.get("/item").then((res) => {
            setAvailableItems(res.data)
            const uniqueTypes = new Set(res.data.map(item => item.type))
            setSections([...uniqueTypes]);
        })
    }, [])

    const addItem = (itemToAdd) => {
        if(!itemToAdd) return;

        setAvailableItems(prevAvailableItems =>
            prevAvailableItems.filter(item => item._id !== itemToAdd._id)
        );

        setItems(prevItems => [...prevItems, {...itemToAdd, value: 1}]);
    }

    const handleValueChange = (e, id) => {
        const newValue = parseInt(e.target.value);

        if(newValue < 1) {
            return
        }

        setItems((prev) =>
            [...(prev.map((i) =>
                i._id === id ? { ...i, value: newValue } : i
            ))]
        );
    };

    const removeItem = (id) => {
        setAvailableItems(prevAvailableItems => [...prevAvailableItems, ...items.filter((i) => i._id === id)])
        setItems(prevItems => prevItems.filter(item => item._id !== id))
    }

    return (
        <>
            <div className="w-full">
                {/* <pre>{JSON.stringify(items)}</pre> */}
                {sections.map((sec) => (
                    <div className="w-full">
                        <h1 className="font-semibold uppercase">{sec}</h1>
                        <CalculationSection removeItem={removeItem} handleValueChange={handleValueChange} addItem={addItem} sectionItems={availableItems.filter((i) => i.type === sec)} items={items.filter((i) => i.type === sec)} />
                    </div>
                ))}
            </div>
            <CalculationFooter items={items} />
        </>
    )
}

export const CalculationSection = ({ sectionItems, items, addItem, handleValueChange, removeItem }) => {

    const [currentSelected, setCurrentSelected] = useState({value: "--", data: null})

    const handleChange = (e) => {
        if(e.target.value !== "--") {
            setCurrentSelected({
                value: e.target.value,
                data: sectionItems.filter((i) => i._id === e.target.value)[0]
            })
        } else {
            setCurrentSelected({
                value: e.target.value,
                data: null
            })
        }
    }

    return (
        <>
        <table className="calculation-table mb-4">
            <thead>
                <tr>
                    <td>Label</td>
                    <td>P/U</td>
                    <td>Amount</td>
                    <td>Action</td>
                    {/* <td>Amount</td> */}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr>
                        <td className={index % 2 ? "bg-gray-100" : "bg-white"}>{item.label}</td>
                        <td className={index % 2 ? "bg-gray-100" : "bg-white"}>{item.price} {item.currency}</td>
                        <td className={index % 2 ? "bg-gray-100" : "bg-white"}>
                            <div className="mx-auto flex justify-center items-stretch w-max">
                                <input value={item.value} onChange={(e) => handleValueChange(e, item._id)} className="border-t border-l border-b bg-gray-200 border-gray-300 px-3 py-1 focus:outline-none rounded-l-md
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-16
                                " type="number" placeholder="1" name="amount" id="amount" />
                                <p className="px-3 py-1 border-r border-t border-b bg-gray-200 border-gray-300 rounded-r-md text-gray-400">{item.unit}</p>
                            </div>
                            
                        </td>
                        <td className={index % 2 ? "bg-gray-100" : "bg-white"}>
                            <button onClick={() => removeItem(item._id)} className="hover:text-red-700"><i className="text-sm fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                ))}

                {/* {sectionItems.length} */}

                {sectionItems.length > 0 && (
                    <tr className="text-green-600">
                        <td className="rounded-bl-xl border-l border-b border-gray-300 bg-green-200">
                            <select className="px-3 py-1 rounded-md bg-green-400 text-white w-full" name="label" value={currentSelected.value} onChange={handleChange} id="label">
                                <option value="--">--</option>
                                {sectionItems.map((i) => (
                                    <option value={i._id}>{i.label}</option>
                                ))}
                            </select>
                        </td>
                        <td className="border-b bg-green-200 border-gray-300">
                            {currentSelected.data ? (
                                <>
                                    {currentSelected.data.price} {currentSelected.data.currency}
                                </>
                            ) : "N/A"}
                        </td>
                        <td className="border-b bg-green-200 border-gray-300">--</td>
                            <td className="rounded-br-xl border-r border-b bg-green-200 border-gray-300"><button className="hover:text-green-800" onClick={() => {
                            addItem(currentSelected.data)
                            setCurrentSelected({value: "--", data: null})
                        }}><i className="fa-solid fa-plus"></i></button></td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}

export const CalculationFooter = ({ items }) => {

    const [budget, setBudget] = useState(2000)
    const [currency, setCurrency] = useState("CZK")

    const [profit, setProfit] = useState(budget)
    const [margin, setMargin] = useState(100)

    useEffect(() => {
        let profit = budget;

        items.forEach((item) => {
            const itemPrice = item.price; // Assuming price is already in the target currency
            profit -= itemPrice * item.value;
        });

        setProfit(profit);
        setMargin(((profit / budget) * 100).toFixed(0));
    }, [items, budget]);


    return (
        <div className="p-4 absolute bottom-0 left-0 w-screen flex flex-row justify-center items-center">
            <div className="flex w-48 justify-center border-y border-l bg-white border-gray-300 flex-row items-stretch py-3 px-3 rounded-l-xl">
                <input value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} className="border-t border-l border-b bg-gray-200 border-gray-300 px-3 py-1 focus:outline-none rounded-l-md
                                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-16
                                    " type="number" placeholder="1" name="amount" id="amount" />
                <input value={currency} onChange={(e) => setCurrency(e.target.value)} type="text" className="w-16 focus:outline-none text-center px-3 border-r border-t border-b bg-gray-200 border-gray-300 rounded-r-md" placeholder="$" />
            </div>
            <p className="z-10 text-xl font-semibold border-y shadow-lg bg-white border-gray-300 py-6 px-6 rounded-xl">{profit} {currency}</p>
            <p className="py-3 px-3 w-48 flex border-y border-r bg-white border-gray-300 justify-center items-center rounded-r-xl">Margin: {margin}%</p>
        </div>
    )
}

