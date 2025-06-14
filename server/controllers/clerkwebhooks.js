import { Webhook } from "svix";
import User from "../models/user.js";


const clerkWebHooks = async (req, res)=>{
try {

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    
    //the signed header from clerk by svix  
    const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
    }
    // verifying the signature
    await whook.verify(JSON.stringify(req.body), headers)

   console.log("what the webhook sent ooks like: , ", req.body)
    // getting data from req body
    const {data, type} = req.body

    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        username: data.first_name + " " + data.last_name,
        image: data.image_url
    }
    // different cases for different events
    switch (type) {
        case 'user.created':{
            await User.create(userData)
            break;
        }
        case 'user.updated':{
            console.log("in updated")
            await User.findByIdAndUpdate(data.id, userData)
            break;
        }
        case 'user.deleted':{
            console.log("in deleted")
            await User.findByIdAndDelete(data.id)
            break;
        }   
    
        default:
            break;
    }
    res.json({succes: true, message: "Webhook Received"})
} catch (error) {
    res.json({succes: false, message: error.message})
}}

export default clerkWebHooks