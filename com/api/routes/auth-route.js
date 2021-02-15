const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {registerValidation, loginValidation} =require('../middleware/auth.validation');


const AuthUser = require('../models/Auth.model');


// GET DATA 
router.get('/', async (req,res)=>{
    try {
        const user = await AuthUser.find();
        res.json(user) 
    } catch (error) {
        res.json({message:error})
    }
});

// Register AuthUser 
router.post('/register', async (req, res)=>{
    // VALIDATION REGISTER DATA 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF NUMBER PHONE IS ALREADY EXISTS 
    const phoneExist = await AuthUser.findOne({phone:req.body.phone});
    if(phoneExist) return res.status(400).send('Phone Number already exists');

    // HASH PASSWORD 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const auth = new AuthUser({
        name    : req.body.name,
        phone   : req.body.phone,
        password: hashPassword
    });
    try {
        const registerAuth = await auth.save();
        // res.json(registerAuth);
        res.json({auth:auth._id})
    } catch (error) {
        res.status(400).send({ErrorMessage:error})
    }
    
});

// Login AuthUser Token
router.post('/login', async (req, res)=>{
    // VALIDATION LOGIN DATA 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF NUMBER PHONZ EXISTS 
    const loginUser = await AuthUser.findOne({phone:req.body.phone});
    if(!loginUser) return res.status(400).send('Phone Number is not found!!');

    // PASSWORD IS CORRECT 
    const validPassword = await bcrypt.compare(req.body.password, loginUser.password);
    if(!validPassword) return res.status(400).send('Invalid password!!')
    
    const token = jwt.sign({_id:loginUser._id}, process.env.TOKEN_SECRET,{expiresIn:'20s'});
    res.header('Authorization', token).send(token);
    
})

module.exports = router;