import "dotenv/config"
import express from 'express'
import cors from "cors"
// import connectDb from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkwebhooks.js"
import User from './models/user.js'
import mongoose from 'mongoose'

const connectDb = async ()=>{
   try {
    mongoose.connection.on('connected', ()=>console.log("database connected")   )
    await mongoose.connect(process.env.MONGODB_URI)
    
} catch (error) {
    console.log("error connecting to db")
    console.log("Error: ", error.message)
}}

connectDb()

const app = express()

app.use(cors())

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// routes
app.post('/api/clerk', clerkWebHooks) 
app.get('/', (req, res)=>res.send("API is working!"))

app.post('/api/test', async (req, res)=>{
console.log("in test post", req.body)
const c = req.body
await User.create(c)
})

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})