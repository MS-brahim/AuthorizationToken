const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// app.use(express.json())
app.use(bodyParser.json())


// connect to db 
mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, ()=>{
    console.log("Connected success");
});

const authRoute = require('./routes/auth-route');
app.use('/', authRoute);
const bookRoute = require('./routes/book-route');
app.use('/book', bookRoute);


app.listen(3000,()=>{console.log('server listen on port 3000')});
