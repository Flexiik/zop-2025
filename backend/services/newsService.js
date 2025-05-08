const News = require("../model/News")

const getNews = async (req, res) => {
    const header = req.headers['authorization']
    try {
        const news = await News.find().sort({ createdAt: -1 })
        const filteredNews = news.filter(n => {
            // If news doesn't require auth, show it to everyone
            if (!n.needsAuth) return true
            // If news requires auth, only show it to authenticated users
            return n.needsAuth && header
        })
        
        res.status(200).json(filteredNews)
    } catch (e) {
        res.status(500).json({ message: e.message || "Bad request" })
    }
}

const createNews = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can create news" })
        }

        const news = new News(req.body)
        await news.save()
        res.status(201).json(news)
    } catch (e) {
        res.status(400).json({ message: e.message || "Bad request" })
    }
}

module.exports = { getNews, createNews } 