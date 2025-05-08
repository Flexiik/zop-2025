import { useEffect, useState } from "react"
import { useAuth } from "./context/AuthProvider"
import { useModal } from "./context/ModalProvider"
import { ActionEnum } from "./context/ModalProvider"
import axios from "axios"

function App() {
  const { auth, user } = useAuth()
  const { openModal } = useModal()
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news")
        setNews(response.data)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      {auth.isAuth && user?.role === "admin" && (
        <button
          onClick={() => openModal(ActionEnum.NEWS_CREATE)}
          className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition-colors w-max"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Create News
        </button>
      )}
      
      <div className="flex flex-col gap-4 w-full">
        {news.map((item) => (
          <div key={item._id} className="bg-white rounded-lg border border-gray-300 p-4 w-full">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{item.body}</p>
            {item.needsAuth && (
              <span className="inline-block mt-2 text-sm text-indigo-600">
                <i className="fa-solid fa-lock mr-1"></i>
                Requires authentication
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
