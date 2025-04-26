const express = require('express');
const mongodbConnection = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
mongodbConnection();

app.use('/auth', authRoutes);
app.use('/posts', blogRoutes);
app.listen(process.env.PORT || 3000,function(){
    console.log(`server started at port ${process.env.PORT?process.env.PORT:'3000'}`);
})