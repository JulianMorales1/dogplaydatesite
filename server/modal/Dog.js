const mongoose = require('mongoose');

const dogSc = new mongoose.Schema({
    name:String,
    breed:String,
    dateOfBirth:String,
    picture:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
})


module.exports = mongoose.model('Dog', dogSc);
