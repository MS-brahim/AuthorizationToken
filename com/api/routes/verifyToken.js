const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Login');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.loginUser = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token!')
    }
}