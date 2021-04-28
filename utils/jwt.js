var jwt= require("jsonwebtoken");
const dotenv = require('dotenv').config()

exports.generateToken = (userId, userName, mobileNumber) =>{
    
    let token =  jwt.sign(
         { userId: userId, userName: userName, mobileNumber: mobileNumber},
         process.env.secret,
         {expiresIn: '1d'})
    return token;
}

exports.verifyToken = async (req, res, next) => {
      try {
        const {token} = req.headers;
        if(!token){
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            })
        }
        var decode = jwt.verify(token, process.env.secret);
        req.user = { userId: decode.userId, userName: decode.userName, mobileNumber: decode.mobileNumber, userBalance: decode.userBalance} 
  
        next();
      } catch (error) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
      }
}