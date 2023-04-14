import mongoose from "mongoose";

// Defining schema 

const userSchema = new mongoose.Schema({
    name : {type: String, require: true, trim: true},
    email : {type: String, require: true, trim: true},
    password : {type: String, require: true, trim: true},
    
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel