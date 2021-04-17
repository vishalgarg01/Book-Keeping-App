const express=require('express');
const asyncHandler=require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const usersRoute=express.Router();
const User=require('../models/User');
const generateToken=require('../utils/generateToken');
//User routes
usersRoute.post('/register', asyncHandler(async (req,res)=>{

    const {name,email,password}=req.body;
    if(!email || !password || !name){
        throw new Error("please add all the fields") 
    }
    const userExists=await User.findOne({email});
    if(userExists){
        throw new Error('User already exist')
    }
    const userCreated=await User.create({email,password,name});
    res.json({
        _id:userCreated._id,
        name:userCreated.name,
        password:userCreated.password,
        email:userCreated.email,
        token:generateToken(userCreated._id)
    });
    })
);

usersRoute.post('/login',asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password ){
        throw new Error("please add all the fields") 
    }
    const user=await User.findOne({email});
    if(user && await user.isPasswordMatch(password)){
        res.status(200);
        res.json({
            _id:user._id,
            name:user.name,
            password:user.password,
            email:user.email,
            token:generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
})
);

usersRoute.get('/',authMiddleware,(req,res)=>{
    res.send(req.user)
})

module.exports=usersRoute;