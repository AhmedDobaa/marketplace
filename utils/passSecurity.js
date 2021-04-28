
let bcrypt= require('bcrypt');

exports.hashPassword = (password, salt) => {
    return bcrypt.hash(password, salt)
 }

exports.genSalt = () => {
  return  bcrypt.genSalt();
 }   
 
exports.compareUserPassword = async (password, userPassword, salt) => {
  const hash = await bcrypt.hash(password, salt)
  return hash === userPassword
}
