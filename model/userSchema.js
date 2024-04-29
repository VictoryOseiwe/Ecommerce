const connection=require('../mongodb/connection')


// defining the schema for the collection
const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model("user",schema);