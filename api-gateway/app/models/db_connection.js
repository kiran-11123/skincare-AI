import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();


const connectDB = async()=>{

    try{

        await mongoose.connect(process.env.DB_URL )

        console.log("Database connected.")

    }
    catch(er){
         console.log("Error Exists " , er);
        process.exit(1);
    }
      
}

export default connectDB;