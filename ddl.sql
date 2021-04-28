
CREATE TABLE `lookup_master` (
  `lookup_master_id` int(11) NOT NULL AUTO_INCREMENT,
  `lookup_en_name` varchar(100) NOT NULL,
  `lookup_ar_name` varchar(100) NOT NULL,
  PRIMARY KEY (`lookup_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4



CREATE TABLE `lookup_details` (
  `lookup_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `lookup_detail_ar_name` varchar(100) NOT NULL,
  `lookup_detail_en_name` varchar(100) NOT NULL,
  `lookup_master_id` int(11) NOT NULL,
  PRIMARY KEY (`lookup_detail_id`),
  KEY `lookup_details_FK` (`lookup_master_id`),
  CONSTRAINT `lookup_details_FK` FOREIGN KEY (`lookup_master_id`) REFERENCES `lookup_master` (`lookup_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4


CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `mobile_number` varchar(100) NOT NULL,
  `user_balance` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_UN` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4


CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_category` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `products_FK` (`product_category`),
  KEY `products_FK_1` (`brand`),
  CONSTRAINT `products_FK_1` FOREIGN KEY (`brand`) REFERENCES `lookup_details` (`lookup_detail_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`product_category`) REFERENCES `lookup_details` (`lookup_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4



CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orders_FK` (`product_id`),
  KEY `orders_FK_1` (`user_id`),
  CONSTRAINT `orders_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4