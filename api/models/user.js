import mongoose from "mongoose";

const model = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,

    },
    email:{
        type:String,
        required:true,
        unique: true,
    }
    ,password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongoose.model( 'User' , model)

export default  User; 