import express from 'express'
import Signin_Service from '../services/Auth_Service.js'
import { Signup_Service , Generate_Code_Service , Verify_Code_Service , Change_Password_Service } from '../services/Auth_Service.js';
import { app_logger } from '../../utils/logger/app_logger.js';
export const Signin_Controller = async(req,res)=>{

    app_logger.info(`Entered into the Signin Controller`)
      
    try{

        const {email , password} = req.body;

        if(!email) {
            return res.status(400),json({
                message : "Email required"
            })
        }

        if(!password){
            return res.status(400).json({
                message : "Password required"
            })
        }


        const token =await  Signin_Service(email , password);

        res.cookie("token" , token , {
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })
         
        app_logger.info(`User logged in successfully , JWT token generated and set in cookies`)
        return res.status(200).json({
            message : "Login Successfull",
            token : token
        })

    }
    catch(er){
         
        app_logger.error(`Error in Signin Controller: ${er.message}`)
        if(er.message === 'Credentials are Wrong'){
            return res.status(404).json({
                message : "Credentials are Wrong"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error",
            error:er.message
        })
    }
}


export const Signup_Controller = async(req,res)=>{
    app_logger.info(`Entered into the Signup Controller`)
    try{

        const {email , username , password } = req.body;

        const user = await Signup_Service(email , username, password);

            app_logger.info(`User Registered Successfully with email: ${email}`)
        return res.status(200).json({
            message : "User Registered Successfully."
        })

    }
    catch(er){
        app_logger.error(`Error in Signup Controller: ${er.message}`)
        if(er.message === 'Email Not found'){
            return res.status(404).json({
                message : "Email Not found"
            })
        }

        else if(er.message === 'Username already taken'){
            return res.status(400).json({
                message : "Username already taken"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error",
            error:er
        })
    }
}


export const Generate_Code_Controller = async(req,res)=>{
    app_logger.info(`Entered into the Generate Code Controller`)
    try{

        const email =req.body;

        const message = await Generate_Code_Service(email);
        
        app_logger.info(`Verification code sent to email: ${email}`)
        return res.status(200).json({
            message : "Verification code sent successfully."
        })

    }
    catch(er){
        
        app_logger.error(`Error in Generate Code Controller: ${er.message}`)
        if(er.message === 'Email Not found'){
            return res.status(400).json({
                message  :"Email Not found"
            })
    }

    return res.status(500).json({
        message : "Internal Server Error",
        error:er
    })
         
    }
}

export const Verify_Code_Controller = async(req,res)=>{
    
    app_logger.info(`Entered into the Verify Code Controller`)
    try{

        const {email , code}   = req.body;

        const response = await Verify_Code_Service(email , code);
            app_logger.info(`Verification code for email: ${email} verified successfully`)
        return res.status(200).json({
            message : "Code verified successfully"
        })

    }

    catch(er){
         app_logger.error(`Error in Verify Code Controller: ${er.message}`)
        if(er.message === 'Email is wrong'){
            return res.status(400).json({
                message : "Email is wrong"
            })
        }
        else if(er.message === 'Code Time Expired'){
            return res.status(400).json({
                message: "Code Time Expired"
            })
        }
        else if(er.message === 'Code is Invalid'){
            return res.status(400).json({
                message : "Code is Invalid"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error",
            error:er
        })
    }


}

export const Change_Password_Controller = async(req,res)=>{
    
    app_logger.info(`Entered into the Change Password Controller`)
    try{

        const {email , password}  = req.body;

        const response = await Change_Password_Service(email , password);
        app_logger.info(`Password changed successfully for email: ${email}`)
        return res.status(200).json({
            message : "Password changed successfully"
        })

    }
    catch(er){
            app_logger.error(`Error in Change Password Controller: ${er.message}`)
        if(er.message === 'Email not Found'){
            return res.status(400).json({
                message : "Email not Found"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
    }
}