import express from 'express';
import cors from  'cors';

import connectDb from './config/connectdb.js'
import dotenv from 'dotenv'
import UserRoutes from './routes/userRoutes.js';
dotenv.config()
 
const server = express();



const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL 

// cors policy 
server.use(cors());

//database connection
connectDb(DATABASE_URL)

server.use(express.json())


// load routes
server.use("/api/user", UserRoutes)


server.listen(PORT, ()=>{
    console.log(`Server runing on port http://localhost:${PORT}`);
})