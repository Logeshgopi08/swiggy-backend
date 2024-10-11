const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utlis/validation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

authRouter.post("/signup", async(req, res) => {
     
  try {
    validateSignUpData(req);
    
    
    const { firstName, lastName, emailId, password } = req.body;

    const hashPassword = await bcrypt.hash(password,10);
         
    
    
    const user = new User({
     firstName,lastName,emailId,password:hashPassword
    });



      const SavedUser=  await user.save();
    const token = await SavedUser.getJWT()
    res.cookie("token",token,{
     expires:new Date(Date.now() + 8* 3600000)
    });

    res.json({
     message:"User Saved Successfully",
     data:user
    });
   
  } catch (error) {
    res.status(401).send(error.message);
  }
});


authRouter.post("/login",async(req,res)=>{
     try {
          const {emailId,password} = req.body;
          const user = await User.findOne({emailId:emailId});
          if(!user){
               return res.send("User Not Found");
          }
          console.log(user);
          

          const isvaildPassword = await user.validatePassword(password);

          if(isvaildPassword){
               const token = await user.getJWT();

               res.cookie("token",token,{
                    expires:new Date(Date.now()+ 8*3600000)
               });

               res.json({message:"login Successfully !!!",
                    data :user
               });
          }else{

               return res.send("Invalid credentials");
          }

          

     } catch (error) {
          res.status(400).send(error.message);
     }

});


authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
     expires:new Date(Date.now())
  });

  res.send("Logout Successfully !!!");
});



module.exports = authRouter;
