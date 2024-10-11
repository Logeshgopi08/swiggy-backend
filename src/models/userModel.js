
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            maxLength:15,
            minLength:4,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            maxLength:15,
            minLength:4,
            trim:true

        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email");
                }
            }
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minLength:8,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password is Not Strong!!");
                }
            }
        },
        address:{
            type:String,
            trim:true,
            minLength:8
        },
        phoneNumber:{
            type:Number,
            
            minLength:10

        }
    }
);

userSchema.methods.getJWT=async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"SwiggyProject",{
        expiresIn: "7d",
      });
    return token;
}

userSchema.methods.validatePassword = async function(passwordByInput){
    const user = this;
    hashPassword= user.password;
    const isValidPassword = await  bcrypt.compare(passwordByInput,hashPassword);
    return isValidPassword;
}

module.exports = mongoose.model("User",userSchema);