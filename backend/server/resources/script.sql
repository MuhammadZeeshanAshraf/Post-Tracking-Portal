CREATE DATABASE `examin_logistic` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `contactnumbers` (
  `contact_number` varchar(255) NOT NULL,
  UNIQUE KEY `contact_number` (`contact_number`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `importprocess` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `total_tracking_ids` varchar(1024) DEFAULT NULL,
  `book_ids` varchar(1024) DEFAULT NULL,
  `not_book_ids` varchar(1024) DEFAULT NULL,
  `book_on_same_date` varchar(1024) DEFAULT NULL,
  `not_book_on_same_date` varchar(1024) DEFAULT NULL,
  `total_bill` varchar(1024) DEFAULT NULL,
  `create_date` date NOT NULL DEFAULT curdate(),
  `file_name` varchar(1024) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `permission_level` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`),
  CONSTRAINT `premission_values` CHECK (`permission_level` = '1' or `permission_level` = '2' or `permission_level` = '3')
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `tracking` (
  `process_id` bigint(20) unsigned NOT NULL,
  `tracking_id` varchar(1024) DEFAULT NULL,
  `booking_date` varchar(1024) DEFAULT NULL,
  `customer_pin_code` varchar(1024) DEFAULT NULL,
  `amount` varchar(1024) DEFAULT NULL,
  `book_status` varchar(1024) DEFAULT NULL,
  `TYPE` varchar(1024) DEFAULT NULL,
  `booked_at` varchar(1024) DEFAULT NULL,
  `delivery_location` varchar(1024) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `primary_phone` varchar(255) NOT NULL,
  `alternative_phone` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`primary_phone`),
  UNIQUE KEY `primary_phone` (`primary_phone`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
