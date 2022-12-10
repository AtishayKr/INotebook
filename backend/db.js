const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.DB_HOST
const connectTOMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("MongoDB connected");
    })
}


module.exports = connectTOMongo;