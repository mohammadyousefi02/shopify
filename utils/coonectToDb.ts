import mongoose from "mongoose";

async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI!)
}

export default connectToDb;