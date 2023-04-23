const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (res, userId, email, username, password, isAdmin, date ) => {
    //const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + 60; // Set token expiration time to 1 minute from now
    const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + 600; // Set token expiration time to 10 minute from now
    const token = jwt.sign({id: userId, email, username, password, isAdmin, date, exp: expirationTimeInSeconds}, process.env.ACCESS_TOKEN_SECRET);
    
    // Set token as an HttpOnly cookie
    res.cookie('access_token', token, { httpOnly: true, maxAge: 60 * 1000 }); // Expires in 1 minute
    
    // Return token
    return token;
}

module.exports.generateAccessToken = generateAccessToken;
