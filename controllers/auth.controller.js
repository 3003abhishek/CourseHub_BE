const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {generateToken,generateAccessToken,generateRefreshToken} = require('../utils/generateTokens');


const Register = async(req,res) => {
    let {username,email,password} = req.body ; 
    try {
        let userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message : "user already exists"});
        }

        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token : generateToken(user),
            }
          
        })
    }
    catch(err){
       res.status(500).json({message: "Internal server error"});
    }
}

const Login = async(req,res) => {
    const {email,password} = req.body ; 
    console.log(email,password);
    try {
        console.log("Login called");
        const user = await User.findOne({email});
        console.log(user)
        if(!user || !(await user.matchPassword(password))){
            console.log("Invalid email or password");
            return res.status(401).json({message : "Invalid email or password"});
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        console.log("Access token generated");
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
          });   
        console.log("Login successful");
        res.status(200).json({
            message : "Login successful",
            accessToken,
            user : {
                id: user._id , 
                name : user.name ,
                email: user.email,
            }
        })

    }
    catch(err) {
        res.status(500).json({message: "kuch to bat he bhai  server error"});
    }
}

const refreshToken = async(req,res) => {
    try{
        console.log("Refresh token called");
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:"No refresh token provided"});
        }
           console.log("Refresh token found");
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, async(err,decoded) => {
            if(err){
                return res.status(403).json({message:"Invalid refresh token"});
            }
            const user = await User.findById(decoded.id);
            if(!user){
                return res.status(404).json({message:"User not found"});
            }
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            res.cookie('refreshToken',newRefreshToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days)
            }
        );
        return res.status(200).json({
            accessToken: newAccessToken,
            user : {
                id: user._id , 
                name : user.name ,
                email: user.email,
            }
        })
    })
}
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    refreshToken,
    Register,
    Login
}; 