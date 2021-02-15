const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:60,
        min:5
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('book', bookSchema);