import { useState } from "react"
import { useModal } from "../../context/ModalProvider"
import axios from "axios"

export const NewsCreate = () => {
    const { closeModal, modal } = useModal()
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        needsAuth: false
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/news", formData)
            closeModal()
        } catch (error) {
            console.error("Failed to create news:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Content</label>
                <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 h-32"
                    required
                />
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="needsAuth"
                    checked={formData.needsAuth}
                    onChange={(e) => setFormData({ ...formData, needsAuth: e.target.checked })}
                    className="rounded border-gray-300"
                />
                <label htmlFor="needsAuth" className="text-sm font-medium">Requires authentication</label>
            </div>
            <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition-colors"
            >
                Create News
            </button>
        </form>
    )
} 