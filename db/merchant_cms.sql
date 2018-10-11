/*
Navicat MySQL Data Transfer

Source Server         : 本地DB
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : merchant_cms

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-10-10 19:21:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_pid` bigint(20) unsigned NOT NULL DEFAULT '0',
  `menu_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_router` varchar(40) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `menu_icon` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `menu_sort_id` int(10) unsigned NOT NULL DEFAULT '0',
  `menu_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `menu_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for merchant
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant` (
  `merchant_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `merchant_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `merchant_contact` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `merchant_tel` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `merchant_email` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `merchant_fax` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `merchant_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `merchant_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`merchant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of merchant
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_type_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `product_merchant_id` bigint(20) NOT NULL,
  `product_serial_number` bigint(14) unsigned NOT NULL,
  `product_name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `product_price` decimal(20,2) unsigned NOT NULL DEFAULT '0.00',
  `product_unit` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `product_size` varchar(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `product_color` varchar(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `product_status` tinyint(1) NOT NULL DEFAULT '0',
  `product_cost` decimal(20,2) unsigned NOT NULL DEFAULT '0.00',
  `product_number` int(10) NOT NULL DEFAULT '0',
  `product_notes` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `product_updated` int(13) NOT NULL DEFAULT '0',
  `product_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `unique_serial_number` (`product_serial_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of product
-- ----------------------------

-- ----------------------------
-- Table structure for product_type
-- ----------------------------
DROP TABLE IF EXISTS `product_type`;
CREATE TABLE `product_type` (
  `product_type_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_type_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_type_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `product_type_created` int(13) NOT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of product_type
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_order`;
CREATE TABLE `purchase_order` (
  `purchase_order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `purchase_order_index` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_order_merchant_name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_merchant_contact` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_merchant_tel` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_merchant_email` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_merchant_fax` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_deposit` decimal(20,2) NOT NULL,
  `purchase_order_amount` decimal(20,2) NOT NULL,
  `purchase_order_payment` enum('cash','pospay','wechatpay','alipay') COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_order_delivery_date` int(13) NOT NULL,
  `purchase_order_status` enum('done','unclear','processing') COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_order_notes` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `purchase_order_updateby` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_createby` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `purchase_order_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`purchase_order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of purchase_order
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_order_item
-- ----------------------------
DROP TABLE IF EXISTS `purchase_order_item`;
CREATE TABLE `purchase_order_item` (
  `purchase_order_item_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `purchase_order_item_order_index` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_serial_number` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_type_id` bigint(20) NOT NULL,
  `purchase_order_item_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_order_item_name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_price` decimal(20,2) unsigned NOT NULL DEFAULT '0.00',
  `purchase_order_item_unit` varchar(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_size` varchar(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_color` varchar(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `purchase_order_item_number` int(10) unsigned NOT NULL DEFAULT '0',
  `purchase_order_item_status` enum('refund','done','processing','pending') CHARACTER SET utf8mb4 NOT NULL DEFAULT 'pending',
  `purchase_order_item_notes` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `purchase_order_item_updateby` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `purchase_order_item_createby` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `purchase_order_item_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `purchase_order_item_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`purchase_order_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of purchase_order_item
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `user_username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_nickname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_session_id` varchar(40) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `user_session_expire` int(13) unsigned NOT NULL DEFAULT '0',
  `user_email` varchar(30) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `user_tel` varchar(15) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `user_role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_google_authenticator` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `user_updated` int(13) unsigned NOT NULL DEFAULT '0',
  `user_created` int(13) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
