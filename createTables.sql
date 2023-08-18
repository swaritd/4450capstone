DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS menu; 
DROP TABLE IF EXISTS restaurants;


CREATE TABLE restaurants (
restaurantName varchar(255) NOT NULL,
phoneNumber varchar(15) NOT NULL,
address varchar(255) NOT NULL ,
restaurantID int UNSIGNED NOT NULL AUTO_INCREMENT,
PRIMARY KEY(restaurantID)
);

CREATE TABLE menu (
itemName varchar(255) NOT NULL,
itemPrice varchar(255) NOT NULL,
itemQuantity int UNSIGNED NOT NULL ,
itemID int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
restaurantID  int UNSIGNED NOT NULL,
FOREIGN KEY (restaurantID) REFERENCES restaurants(restaurantID)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
userEmail varchar(255) NOT NULL,
userID int UNSIGNED NOT NULL AUTO_INCREMENT,
userAddress varchar(255),
userPhoneNumber varchar(15),
PRIMARY KEY(userID)
);

CREATE TABLE cart (
currentCart boolean NOT NULL DEFAULT true,
itemName varchar(255) NOT NULL,
itemPrice varchar(255) NOT NULL,
itemQuantity int UNSIGNED,
itemID int UNSIGNED NOT NULL,
restaurantID int UNSIGNED NOT NULL,
userID int UNSIGNED NOT NULL,
FOREIGN KEY (itemID) REFERENCES menu(itemID),
FOREIGN KEY (restaurantID) REFERENCES restaurants(restaurantID),
FOREIGN KEY (userID) REFERENCES users(userID)
ON DELETE CASCADE ON UPDATE CASCADE
)