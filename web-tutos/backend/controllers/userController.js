import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";


class userController{
    static UserRegistration = async (req, res)=>{
        const {name, email, password, password_confirmation, tc} = req.body
        const user = await UserModel.findOne({email: email})
        if(user){
            res.send({"status":"failed","message":"Email Already exsit" })
        }else{
            if(name && email && password && password_confirmation){
                if(password === password_confirmation){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                   const doc = new UserModel({
                    name : name,
                    email:email,
                    password : hashPassword,
                    
                   })
                   await doc.save();
                   const save_user = await  UserModel.findOne({email:email})
                   // genrate jwt token
                   const token = Jwt.sign({userID : save_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})

                   res.send({status:true, data:doc, "token": token})
                    } catch (error) {
                        console.log(error);
                        res.send({"status":"failed","message":"Unable to register" })
                    }
                }else{
                    res.send({"status":"failed","message":"Your password is dose not match" })
                }

            }else{
                res.send({"status":"failed","message":"All feild are required" })
            }
        }
    }
    static UserLogin = async(req,res)=>{
        try {
            const {email,password} = req.body
                        if(email && password){
                const user = await UserModel.findOne({email: email})
                if(user !=null)
                {
                      const isMatch = await bcrypt.compare(password, user.password)
                      if(user.email === email && isMatch){
                            res.send({"status":"sucess","message":"Login sucess"})
                      } else{
                        res.send({"status":"failed","message":"Your email and password is dose not match" })
                      } 
                }else{
                    res.send({"status":"failed","message":"Unable to Login User" })
                }

            }else{
                res.send({"status":"failed","message":"All feild are required" })
                
            }
           
        } catch (error) {
            console.log(error);
            res.send({"status":"failed","message":"Unable to Login User" })
        }
    }
}

export default userController