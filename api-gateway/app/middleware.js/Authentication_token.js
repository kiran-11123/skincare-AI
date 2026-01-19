import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const Authenticate_token = (req,res,next)=>{

    const token = req.cookies?.token;

    if(!token){
         return res.status(400).json({
            message : "Token not found.."
         })
    }
     
    try{

        const decoded =jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch(er){
         console.log("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
    }
}