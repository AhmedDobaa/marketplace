
let sql= require('../db/orders.query');
let servicePool= require('../dbconnection/servicePool');
let businessPool= require('../dbconnection/businessPool');
let userSql = require('../db/user.query');

exports.requestProduct = async (req, res) =>{
   try {
        var { userId } = req.user;
        var { product_id, product_price } = req.body;
        // get user balance
        let balance = await businessPool(req, res, userSql.getUserBalanceBasedId, [userId]);
        // make order with the requested product
        var order = await businessPool(req, res, sql.insertANewProduct, [product_id, userId]);
        // deducte product price from user balance
        let balanceAfterRequest = userBalanceAfterRequest(product_price, balance.rows[0].user_balance);
        await servicePool(req, res, userSql.updateUserBalance, [ balanceAfterRequest, userId])  
   } catch (error) {
        // cancel order
       await businessPool(req, res, sql.deleteRequestedOrder, [order.insertId]);
       res.status(500).json({
           status: 500,
           message_ar: 'عملية الشراء لم تُنفذ لحدوث خطأ، وتم إرجاع العمليه',
           message_en: "requested product didn't execute as there is an error, and tranasction cancelled"
       })
   } 
}

exports.cancelRequest = async(req, res) =>{
  try {
      let { order_id } = req.body;
      let { userId } = req.user;
       // get user balance
       let balance = await businessPool(req, res, userSql.getUserBalanceBasedId, [userId]);
      let productPrice= await businessPool(req, res, sql.getProductBasedOrder, [order_id]);
      let balanceAfterCancelRequest = await userBalanceAfterCancelRequest(productPrice.rows[0].price, balance.rows[0].user_balance);
      await businessPool(req, res, userSql.updateUserBalance, [ balanceAfterCancelRequest, userId])  
      await servicePool(req, res, sql.deleteRequestedOrder, [order_id]);

  } catch (error) {
    
  }
}

// to gey all user order to review his orders and if he want to cancel any order
exports.getUserOrders = async (req, res) =>{
   let { userId } = req.user;
   await servicePool(req, res, sql.getUserOrders, [userId]);
}


const userBalanceAfterRequest = (productPrice, userBalance) =>{
  return userBalance - productPrice ;
}

const userBalanceAfterCancelRequest = (productPrice, userBalance) =>{
  return userBalance + productPrice ;
}