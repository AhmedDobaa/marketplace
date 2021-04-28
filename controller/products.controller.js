
var sql= require('../db/product.query');
var servicePool= require('../dbconnection/servicePool');
var businessPool= require('../dbconnection/businessPool');
var userSql= require('../db/user.query');

exports.getAllProducts = async (req, res) =>{
   let { userId } = req.user;
   // get user balance
   let balance = await businessPool(req, res, userSql.getUserBalanceBasedId, [userId]);
   await servicePool(req, res, sql.getAllProducts, [balance.rows[0].user_balance]);
}