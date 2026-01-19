import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './app/models/db_connection.js';
import rateLimit from 'express-rate-limit';
import Auth_Router from './app/routes/auth_routes.js';
import cookieParser from 'cookie-parser';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 ,  // limit each IP to 100 requests per windowMs
   message : "Too Many Requests , Please try again later."
});

const app = express();

const corsOptions = {
     origin : [
        'http://localhost:3000'
     ]
     ,
     credentails:true,
         methods:["GET" , "POST",'PUT','DELETE' ,'OPTIONS'],
      allowedHeaders:['Content-Type','Authorization']
}


app.use(limiter);
app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/users" , Auth_Router);
await connectDB();





app.listen(5000, () => {
  console.log('API Gateway running on port 5000');
})