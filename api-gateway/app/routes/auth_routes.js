import express from 'express'
import { Signin_Controller , Signup_Controller } from '../controllers/Auth_Controller.js';
const Auth_Router  = express.Router();


Auth_Router.post("/signin" , Signin_Controller);
Auth_Router.post("/signup" , Signup_Controller)













export default Auth_Router;