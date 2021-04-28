const Joi = require('joi');


const register = Joi.object().keys({
    user_name: Joi.required(),
    mobile_number: Joi.string().max(11).min(11).pattern(new RegExp('^(01)[0-9]{9}$')).message("Please enter valid mobile number").required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).message("Password length must be at least 3 characters long")
                 .required()
});

const login = Joi.object().keys({
    mobile_number: Joi.required(),
    password: Joi.required()
});

const retrieveProducts = Joi.object().keys({
    user_balance: Joi.required()
});

const updateBalance = Joi.object().keys({
    user_balance: Joi.required()
});


const makeOrder = Joi.object().keys({
    product_id: Joi.required(),
    product_price: Joi.required()
});


const validateRegister = (req, res, next)=>{
   let result = register.validate(req.body);
    if(result.error != null){
        res.status(400).json({
            status: 400,
            mesaage: result.error.details[0].message
        })
    }else{
        next();
    }
}

const validateLogin = (req, res, next)=>{
    let result = login.validate(req.body);
     if(result.error != null){
         res.status(400).json({
             status: 400,
             mesaage: result.error.details[0].message
         })
     }
     else{
        next();
    }
}

const validateRetrieveProducts = (req, res, next)=>{
    let result = retrieveProducts.validate(req.body);
     if(result.error != null){
         res.status(400).json({
             status: 400,
             mesaage: result.error.details[0].message
         })
     }
     else{
        next();
    }
}

const validateUpdateBalance = (req, res, next)=>{
    let result = updateBalance.validate(req.body);
     if(result.error != null){
         res.status(400).json({
             status: 400,
             mesaage: result.error.details[0].message
         })
     }
     else{
        next();
    }
}

const validateMakeOrder = (req, res, next)=>{
    let result = makeOrder.validate(req.body);
     if(result.error != null){
         res.status(400).json({
             status: 400,
             mesaage: result.error.details[0].message
         })
     }
     else{
        next();
    }
}

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin,
    validateRetrieveProducts: validateRetrieveProducts,
    validateUpdateBalance: validateUpdateBalance,
    validateMakeOrder: validateMakeOrder
}