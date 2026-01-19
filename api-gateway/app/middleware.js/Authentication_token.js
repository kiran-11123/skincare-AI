import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { app_logger } from '../../utils/logger/app_logger.js';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const Authenticate_token = (req,res,next)=>{

    app_logger.info(`Entered into the Authenticate token middleware`)

    const token = req.cookies?.token;

    if(!token){
         return res.status(400).json({
            message : "Token not found.."
         })
    }
     
    try{

        const decoded =jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        app_logger.info(`JWT payload fetched successfully`)
        next();

    }
    catch(er){
        app_logger.info("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
    }
}