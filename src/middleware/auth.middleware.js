const {verifyToken} = require("../utils/token.util");
const UserModel = require("../models/user.model");

async function validateUser(req,res,next){
    const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized access, token is missing"});
    }
    try{
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.userId);
        req.user = user;
        next();
    }catch(err){
        return res.status(400).json({message:"Unauthorized access,invalid token",error:err.message});
    }
}

module.exports = validateUser;