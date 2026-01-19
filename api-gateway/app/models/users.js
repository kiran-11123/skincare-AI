import { request } from "express";
import mongoose from "mongoose";


const UserSchema  = new mongoose.Schema({
     email : {type:String , required:true},
     username:{type:String , required:true},
     password:{type :String , required : true},
     resetPasswordToken : {type:String },
     resetPasswordExpiry :{type:Date},
     createdAt  : {type :Date , default:Date.now}
})

const user_model = mongoose.model("Users" , UserSchema);



export default user_model;