import mongoose from "mongoose";

export const dbConnection = () => {
    try {
        const URI = process.env.mongoDB_URI
        mongoose.connect(URI).then(() => console.log(`MongoDB Connected`)).catch((error) => console.log(`MongoDB ERROR : ${err.message}`))
    } catch (error) {
        console.log("error", err.message)
    }
}