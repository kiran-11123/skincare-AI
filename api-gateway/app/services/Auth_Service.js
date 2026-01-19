import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import user_model from '../models/users.js'
import { GenerateJWT } from '../../utils/jwt.js'
import transporter from '../../utils/Nodemaier.js'


export const Signin_Service = async(email , password)=>{
       
    try{

        // check whether the email is present in the DB

        const find_user  = await user_model.findOne({email :email});

        if(!find_user){
             throw new Error('Credentials are Wrong')
        }

        // check the password 

        const password_check = await bcrypt.compare(password , find_user.password);

        const token  = GenerateJWT(email);

        return token;

    }
    catch(er){
          throw er; 
    }
}



export const Signup_Service = async(email  , username , password)=>{

    try{

        const find_user = await user_model.findOne({email :email});

        if(find_user){
            throw new Error('Email Not found')
        }

        const username_check = await user_model.findOne({username:  username});

        if(username_check){
            throw new Error('Username already taken')
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user  = await user_model.create({
             email:email ,
             username:username,
             password :hashedPassword
        })

        return user;

    }
    catch(er){
         throw er;
    }

}


export const Generate_Code_Service = async(email)=>{
      
    try{

        const find_user = await user_model.findOne({email :email})
        
        if(!find_user){
            throw new Error('Email Not found')
        }

        const code  = Math.floor(100000 + Math.random()*900000)

        const expiry = new Date(Date.now() + 15*60*1000);


        const updated_code  = await bcrypt.hash(code , 10);

        find_user.resetPasswordToken = updated_code;
        find_user.resetPasswordExpiry = expiry ; 


        await find_user.save();

        await transporter.sendMail({

            to:email,
            subject:`Password Reset Code`,
             html: `
        <p>Your password reset code is:</p>
        <h2>${code}</h2>
        <p>This code will expire in <strong>15 minutes</strong>.</p>
      `
        })

        return {
            message : "Password reset code sent to the mail successfully",
            email,
        }


    }
    catch(er){
        throw new er;
    }
}



export const Verify_Code_Service = async(email , code)=>{
       
    try{

        const find_user = await user_model.findOne({email : email})

        if(!find_user){
             throw new Error("Email is wrong")
        }


        if(find_user.resetPasswordExpiry < Date.now()){
             throw new Error('Code Time Expired')


        }

        if(!await bcrypt.compare(code.toString() , find_user.resetPasswordToken)){
             throw new Error('Code is Invalid')
        }

        return email ; 
    }
    catch(er){
        throw new er;
    }
}

export const Change_Password_Service = async(email , password)=>{
       
    try{

        const find_user = await user_model.findOne({email  :email})
        if(!find_user){
            throw new Error('Email not Found')
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        find_user.password = hashedPassword;

        await find_user.save();

        return email ;

    }
    catch(er){
          
        throw new er;
    }
}