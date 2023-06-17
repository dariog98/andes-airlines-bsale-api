import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import router from './app/routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log('API lista en el puerto ', PORT)
})