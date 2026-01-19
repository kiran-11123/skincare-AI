import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import user_model from '../app/models/users.js';
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET


export async function GenerateJWT(email){


    const find_user = await user_model.findOne({email : email})
    const payload = {user_id : find_user._id , username : find_user.username , email : find_user.email}

    const token = jwt.sign(payload , JWT_SECRET, {expiresIn:"7d"})

    return token ; 



}

