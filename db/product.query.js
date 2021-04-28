let products= {

   getAllProducts: `SELECT product_id, product_name, product_category,
   (select lookup_detail_ar_name from lookup_details where lookup_detail_id = product_category) category_ar_name,
   (select lookup_detail_en_name from lookup_details where lookup_detail_id = product_category) category_en_name,
   brand,
   (select lookup_detail_en_name from lookup_details where lookup_detail_id = brand) brand_en_name,
   (select lookup_detail_ar_name from lookup_details where lookup_detail_id = brand) brand_ar_name,
   price
   FROM products
   where price <= ?`
}

module.exports = products;