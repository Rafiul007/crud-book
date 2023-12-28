const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.DB_URL;

const conn = () =>{
    try{
        mongoose.connect(db)
        console.log("DB connected")
    }catch(err){
        console.log(err)
    }
}
module.exports = conn