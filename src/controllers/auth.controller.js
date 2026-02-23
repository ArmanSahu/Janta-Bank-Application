const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const {generateToken} = require("../utils/token");

/**
* - user SingUp controller
* - POST /api/auth/signup
*/

async function signUpController(req,res){
    const {email,username,password} = req.body;
    try{
        const isExists = await userModel.findOne({
        email : email
        });
        if(isExists){
            return res.status(422).json({
                message : "User already exists with this email",
                status : "failed"
            });
        }
        const user = await userModel.create({
            email,
            username,
            password
        });
        res.status(201).json({
            message : "You are signedUp",
            user : {
                _id : user._id,
                email : user.email,
                username : user.username,
            }
        });
    }catch(err){
        res.status(500).json({
            message:"Server Error",
            error : err.message
        })
    }
}

async function signInController(req,res){
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({
            email : email
        }).select("+password");

        if(!user){
            return res.status(401).json({message:"Invalid Email ! Please Signup"});
        }
        const isValid = await user.comparePass(password);
        if(!isValid){
            return res.status(401).json({
                message:"Invalid Password"
            });
        }
        const token = generateToken(user);
        res.cookie("token",token);

        res.status(200).json({
            message : "Signin successfull",
            token
        });

    }catch(err){
        res.status(500).json({
            message:"Server Error",
            error : err.message
        })
    }
}

module.exports = {signUpController,signInController};