
const mongoose = require("mongoose");


const postschema = mongoose.Schema({
    name:String,
    number:Number,
    amount:Number,
    taka:Number,
    // send propaty
    sp:String,
    // find all opst
    fp:Number,
    tnx:String,
    userid:String
});

module.exports = mongoose.model("post",postschema)