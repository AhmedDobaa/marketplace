let users= {

       getUserBasedMobileNumber: `SELECT user_id, user_name, password, salt, mobile_number, user_balance FROM users where mobile_number = ?`,
       
       register: `INSERT INTO users (user_name, password, salt, mobile_number) VALUES(?, ?, ?, ?)`,

       updateUserBalance: ` UPDATE users
                            SET user_balance = ?
                            WHERE user_id= ?`,
                            
       getUserBalanceBasedId: `SELECT user_balance FROM users where user_id = ?`,

}

module.exports = users;