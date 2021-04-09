const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
//schema(Blueprint)
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,  
        unique:true   
    },
    password:{
        type:String,
        required:true, 
    }
});
//function to hash password
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
//verify password during login
UserSchema.methods.isPasswordMatch=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User=mongoose.model('User',UserSchema);
module.exports=User;