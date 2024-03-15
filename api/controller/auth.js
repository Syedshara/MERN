import User from  '../models/user.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';

export const createUser =async(req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username ||  !email || !password || username ==='' ||  email===""|| 
     password===""){
        next(errorHandler(400,'Fill  all the fields??'));
     }
     const hash_key = bcryptjs.hashSync(password,10)

     const  user= new User({
        username,
        email,
        password:hash_key
     })
     try{
         await user.save();
         res.status(200).json(user)

     }
     catch(err){
         next(err);
     }
    
    
}