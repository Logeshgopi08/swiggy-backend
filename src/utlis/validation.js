const validator = require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName ||!lastName||!emailId||!password){
         throw new Error("Enter Fields Properly");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Please Enter Strong Password");
    }
    
}

module.exports = {validateSignUpData}