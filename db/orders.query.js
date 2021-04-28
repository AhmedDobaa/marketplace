let orders= {

    insertANewProduct: `INSERT INTO orders
                        (product_id, user_id)
                        VALUES(?, ?) `,
    
    deleteRequestedOrder: `DELETE FROM orders
                           WHERE order_id = ? `,

    getProductBasedOrder: `select price from products where product_id = (select product_id from orders where order_id = ?)`,
    
    getUserOrders: `SELECT order_id, o.product_id, price, product_name,
                    (select lookup_detail_ar_name from lookup_details where lookup_detail_id = 
                        (select product_category from products p where p.product_id = s.product_id )) category_ar_name,
                    (select lookup_detail_en_name from lookup_details where lookup_detail_id =
                        (select product_category from products p where p.product_id = s.product_id )) category_en_name, user_id
                    FROM orders o, products s where user_id = ? and o.product_id = s.product_id`
 }
 
 module.exports = orders;