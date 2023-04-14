import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async(DATABASE_URL)=>{
    try {
         const Db_Option = {
            dbName : "CardanoRacing"
         }
         await mongoose.connect(DATABASE_URL, Db_Option)
         console.log("Connected sucessfull......");
    } catch (error) {
        console.log(error);
    } 
}

export default connectDb;