const router = require('express').Router();

const Book = require('../models/Book.model')
const verify = require('./verifyToken')


// GET DATA 
router.get('/',verify, async (req,res)=>{
    try {
        const books = await Book.find();
        res.json(books) 
    } catch (error) {
        res.json({message:error})
    }
});

// Register AuthUser 
router.post('/Add', async (req, res)=>{

    const newBook = new Book({
        name    : req.body.name,
        author  : req.body.author,
        price   : req.body.price
    });
    try {
        const saveBook = await newBook.save();
        res.json(saveBook);
    } catch (error) {
        res.status(400).send({ErrorMessage:error})
    }
    
});

module.exports = router;