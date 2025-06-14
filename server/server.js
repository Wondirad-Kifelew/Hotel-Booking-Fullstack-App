import "dotenv/config"
import express from 'express'
import cors from "cors"
import connectDb from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkwebhooks.js"

connectDb()
const app = express()

app.use(cors())

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// routes
app.use('/api/clerk', clerkWebHooks) 
app.get('/', (req, res)=>res.send("API is working!"))


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})