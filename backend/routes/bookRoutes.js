const express=require('express');
const expressAsyncHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const BookRouter=express.Router();
const Book=require('../models/Book');

BookRouter.post('/',expressAsyncHandler(async (req,res)=>{
    const book=await Book.create(req.body);
    if(book){
        res.status(200);
        res.json(book);
    }
    else{
        res.status(500);
        throw new Error('Book creating failed')
    }
}));
BookRouter.get('/',expressAsyncHandler(async (req,res)=>{
    const book=await Book.find({});
    if(book){
        res.status(200);
        res.json(book);
    }
    else{
        res.status(500);
        throw new Error('There are no Books')
    }
}));

BookRouter.put('/:id',authMiddleware,expressAsyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id);
    if(book){
        const updatedBook=await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            nulValidators:true,
        })
        res.status(200);
        res.json(updatedBook)
    }else{
        res.status(500);
        throw new Error('Update failed');  
    }
}));
BookRouter.delete('/:id',authMiddleware,expressAsyncHandler(async(req,res)=>{
    try{
        const book =await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
    }catch (error){
        res.json(error);
    }
}));
module.exports=BookRouter;