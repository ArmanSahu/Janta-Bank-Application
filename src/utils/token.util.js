const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign({
        userId : user._id
    },process.env.JWT_SECRET,{expiresIn : "3d"});
}

function verifyToken(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {generateToken,verifyToken};