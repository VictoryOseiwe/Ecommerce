const mongoose=require('mongoose')
const dotenv=require('dotenv').config()


// defining the schema for the collection
const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
    }
})

module.exports= mongoose.model("user",schema);
