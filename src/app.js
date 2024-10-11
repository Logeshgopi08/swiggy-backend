const express = require("express");
const app= express();
const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter");

app.use(express.json());

app.use("/",authRouter);



connectDB().then(()=>{
    console.log("Database is Connected");

    app.listen(3500,()=>{
        console.log("Server is In 3500 Port");
        
    });
    
}).catch((err)=>{
    console.log(err);
    
})
