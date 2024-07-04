import express from 'express'
import productsRoutes from './routers/product.routers.js'
import cors from 'cors';

const app = express()
app.use(cors())


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route
app.use(productsRoutes)


app.listen(5000)
console.log('Server on port 5000')