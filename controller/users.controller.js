
var sql= require('../db/user.query');
var servicePool= require('../dbconnection/servicePool');
var businessPool= require('../dbconnection/businessPool');
var bcrypt= require('bcrypt');
var passSecurity= require('../utils/passSecurity'); 
var error= require('../utils/errors')
var jwtUtil = require('../utils/jwt');

exports.register= async (req, res) =>{
   try {
       let {user_name, password, mobile_number} = req.body;
 
       // generate salt to concat with password
       let salt = await passSecurity.genSalt();
       password = await passSecurity.hashPassword(password, salt);
       
       await servicePool(req, res, sql.register, [user_name, password, salt, mobile_number]);
   } catch (error) {
       res.status(400).json({
             status: 400,
             message_ar: 'حدث خطأ أثناء عملية التسجيل',
             message_en: "An error occured during registeration"
       })     
   }
}

exports.login = async (req, res) =>{
      try{
            let {mobile_number, password} = req.body;
             // check if user exists and his password is correct
            let checkUser= await validateUserPassword(mobile_number, password);
            if(checkUser === false){
                  res.status(200).json({
                        status: 400,
                        error_en: error.LOGIN_ERROR_EN,
                        error_ar: error.LOGIN_ERROR_AR
                    }) 
            }else{
                 // generate token based user data 
                 let token =  jwtUtil.generateToken(checkUser.rows[0].user_id, checkUser.rows[0].user_name,
                                                    checkUser.rows[0].mobile_number);
                 res.status(200).json({
                       status: 200,
                       token: token,
                       user_data: {user_balance: checkUser.rows[0].user_balance}
                 })
            }
      }catch(error) {
            res.status(500).json({
                  error: "Failed To Get The User"
            })
      }
}


 const validateUserPassword = async (mobile_number, password, req, res) =>{

      // get user used his mobile number
      let user=  await businessPool(req, res, sql.getUserBasedMobileNumber, [mobile_number]);
      if(user.rows.length === 0){
            return false;
      }
        // check password
        let validPassword = await passSecurity.compareUserPassword(password, user.rows[0].password, user.rows[0].salt)
        if (validPassword) {
            return user
         } else {
            return false;
         }         
}

exports.updateUserBalance = async (req, res) =>{
      const { user_balance } = req.body;
      const { userId } = req.user;
      // get current user balance
      let balance = await businessPool(req, res, sql.getUserBalanceBasedId, [userId]);
      let newBalance = balance.rows[0].user_balance + user_balance;
      await servicePool(req, res, sql.updateUserBalance, [newBalance, userId]);
}