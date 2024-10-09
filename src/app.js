const express = require("express");
const app= express();

app.use("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(3500,()=>{
    console.log("Server is In 3500 Port");
    
});