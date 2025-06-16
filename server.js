const express = require('express')
const cors = require('cors')
require("dotenv-safe").config({path: "./src/config/.env"})
require('./src/middlewares/authConfig.js')
const swaggerDocs = require('./src/docs/swagger.js')

const app = express()

var corsOptions = {
    origin: 'https://localhost:8081'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productRouter = require('./src/routes/productRouter.js')
app.use('/api/products', productRouter)
const categoryRouter = require('./src/routes/categoryRouter.js')
app.use('/api/categories', categoryRouter)
const orderRouter = require('./src/routes/orderRouter.js')
app.use('/api/orders', orderRouter)
const userRouter = require('./src/routes/userRouter.js');
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.json({ message: 'API aula de Backend'})
})

swaggerDocs(app);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})