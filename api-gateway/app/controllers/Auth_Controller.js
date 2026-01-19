import express from 'express'
import Signin_Service from '../services/Auth_Service.js'
import { Signup_Service , Generate_Code_Service , Verify_Code_Service , Change_Password_Service } from '../services/Auth_Service.js';

export const Signin_Controller = async(req,res)=>{
      
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

        return res.status(200).json({
            message : "Login Successfull",
            token : token
        })

    }
    catch(er){
         
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
      
    try{

        const {email , username , password } = req.body;

        const user = await Signup_Service(email , username, password);


        return res.status(200).json({
            message : "User Registered Successfully."
        })

    }
    catch(er){

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
      
    try{

        const email =req.body;

        const message = await Generate_Code_Service(email);

        return res.status(200).json({
            message : "Verification code sent successfully."
        })

    }
    catch(er){

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
      
    try{

        const {email , code}   = req.body;

        const response = await Verify_Code_Service(email , code);

        return res.status(200).json({
            message : "Code verified successfully"
        })

    }

    catch(er){
         
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
     
    try{

        const {email , password}  = req.body;

        const response = await Change_Password_Service(email , password);

        return res.status(200).json({
            message : "Password changed successfully"
        })

    }
    catch(er){
         
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