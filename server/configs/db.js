import mongoose from 'mongoose'

const connectDb = async ()=>{
   try {
    mongoose.connection.on('connected', ()=>console.log("database connected")   )
    await mongoose.connect(process.env.MONGODB_URI)
    
} catch (error) {
    console.log("error connecting to db")
    console.log("Error: ", error.message)
}}
export default connectDb