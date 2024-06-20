import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    name:{
        type:String
    },
    author:{
        type:String
    },
    description:{
        type:String
    }


})

const Book=mongoose.model('book',bookSchema)
export default Book