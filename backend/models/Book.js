const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    category:{
        type:String,
        required:[true,'Book category is required'], 
    },
    author:{
        type:String,
        required:true, 
    },
    title:{
        type:String,
        required:true, 
    },
    createdBy:{ //which user stores this book
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true, 
    },
}, {
    timestamps:true,
})
const Book=mongoose.modle('Book',bookSchema);
module.exports=Book;