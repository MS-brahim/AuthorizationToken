const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:60,
        min:6
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        min:13
    },
    password:{
        type:String,
        required:true,
        max:30,
        min:3
    }
});

module.exports = mongoose.model('auth', authSchema);