import express from 'express'
import { Signin_Controller , Signup_Controller , Verify_Code_Controller , Generate_Code_Controller , Change_Password_Controller } from '../controllers/Auth_Controller.js';
const Auth_Router  = express.Router();


Auth_Router.post("/signin" , Signin_Controller);
Auth_Router.post("/signup" , Signup_Controller)
Auth_Router.post("/generate-code" , Generate_Code_Controller);
Auth_Router.post("/verify" , Verify_Code_Controller);
Auth_Router.post("/change_password" , Change_Password_Controller);













export default Auth_Router;