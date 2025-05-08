const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()

const authRouter = require("./routes/authRoutes")
const itemRouter = require('./routes/itemRoutes')
const newsRouter = require('./routes/newsRoutes')

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, "|", req.path)
    next()
})

app.use("/item", itemRouter)
app.use("/auth", authRouter)
app.use("/news", newsRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`APP | Database connected successfully`)
    app.listen(process.env.PORT, () => {
        console.log(`APP | Running on port ${process.env.PORT}`)
    })
}).catch((e) => {
    console.log(`APP | Database connection failed..`)
})
