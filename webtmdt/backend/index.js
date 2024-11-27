const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Category = require('./models/category.model.js'); 
const categoryRoute=require('./routes/category.route.js');
const cors=require('cors');
app.use(express.json())

app.use(cors())
//routes
app.use("/api/categories",categoryRoute)
app.listen(3000,() => {
    console.log('listening on port 3000');
});




mongoose.connect("mongodb://localhost:27017/tmdt").then(()=>{
    console.log("ket noi thanh cong")
})