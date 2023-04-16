CREATE DATABASE biddingSystemDB;

USE biddingSystemDB;
CREATE TABLE Login(
Login_id Varchar(200),
login_name VARCHAR(50),
login_email varchar(50),
login_password varchar(200),
login_roles varchar(50),
PRIMARY KEY (Login_id)
);




CREATE TABLE BUYER(
Buyer_id VARCHAR(200),
Buyer_name VARCHAR(50),
Buyer_phone_no VARCHAR(30) UNIQUE,
Buyer_email VARCHAR(50),
Buyer_login_id VARCHAR(50),
PRIMARY KEY (Buyer_id),
CONSTRAINT fk_Buyer_login_id FOREIGN KEY (Buyer_login_id)
 REFERENCES Login(Login_id) ON DELETE CASCADE
);

CREATE TABLE farmer(
Farmer_id VARCHAR(200),
Farmer_name VARCHAR(50),
Farmer_phone_no VARCHAR(30) UNIQUE,
Farmer_email VARCHAR(50),
Farmer_login_id VARCHAR(50),
PRIMARY KEY (Farmer_id),
CONSTRAINT fk_Farmer_login_id FOREIGN KEY (Farmer_login_id)
 REFERENCES Login(Login_id) ON DELETE CASCADE
);


CREATE TABLE Admin(
Admin_id VARCHAR(200),
Admin_Name VARCHAR(50),
Admin_Mobile VARCHAR(50) unique,
Admin_email varchar(50) unique,
Admin_login_id varchar(50),
PRIMARY KEY (Admin_id),
CONSTRAINT fk_Admin_login_id FOREIGN KEY (Admin_login_id)
 REFERENCES Login(Login_id) ON DELETE CASCADE
);

CREATE TABLE Coooperative(
Coooperative_id VARCHAR(200),
Coooperative_Name VARCHAR(50),
Coooperative_Mobile VARCHAR(50) unique,
Coooperative_email varchar(50) unique,
Coooperative_login_id varchar(50),
PRIMARY KEY (Coooperative_id),
CONSTRAINT fk_Coooperative_login_id FOREIGN KEY (Coooperative_login_id)
 REFERENCES Login(Login_id) ON DELETE CASCADE
);


CREATE TABLE Coooperative_Product(
Product_id VARCHAR(200),
Product_Name VARCHAR(50),
Product_quantity VARCHAR(50),
Product_file VARCHAR(50),
Product_description VARCHAR(50),
product_price int,
Product_date DATETIME,
Product_bid_startTime DATETIME,
Product_bid_closingTime DATETIME,
Product_location VARCHAR(50),
PRIMARY KEY (Product_id)
);


CREATE TABLE Bidding(
Bidding_id VARCHAR(200),
Bidding_buyers_id VARCHAR(200),
Bidding_total_cost INT,
Bidding_desc VARCHAR(50),
Bidding_product_id VARCHAR(50),
Bidding_date date,
PRIMARY KEY (Bidding_id),
CONSTRAINT fk_Bidding_buyers_id FOREIGN KEY (Bidding_buyers_id)
 REFERENCES Buyer(Buyer_id) ON DELETE CASCADE,
CONSTRAINT fk_Bidding_product_id FOREIGN KEY (Bidding_product_id) 
 REFERENCES Coooperative_Product(Product_id) ON DELETE CASCADE
);

CREATE TABLE Accepted_Bidding(
Accepted_id VARCHAR(200),
Accepted_Bidding_id VARCHAR(200),
Accepted_Buyer_id VARCHAR (200),
Accepted_product_id VARCHAR(200),
Accepted_Amount INT,
Accepted_date date,
PRIMARY KEY(Accepted_id),
CONSTRAINT fk_Accepted_Bidding_id FOREIGN KEY (Accepted_Bidding_id)
 REFERENCES Bidding(Bidding_id) ON DELETE CASCADE,
 CONSTRAINT fk_Accepted_Buyer_id FOREIGN KEY (Accepted_Buyer_id)
 REFERENCES BUYER(Buyer_id) ON DELETE CASCADE,
 CONSTRAINT fk_Accepted_product_id FOREIGN KEY (Accepted_product_id) 
 REFERENCES Coooperative_Product(Product_id) ON DELETE CASCADE
);


CREATE TABLE Payment(
Payment_id VARCHAR(200),
Payment_amount INT,
Payment date,
Payment_mode VARCHAR(50),
Payment_Accepted_id varchar(50),
PRIMARY KEY (Payment_id),
CONSTRAINT fk_Payment_Accepted_id FOREIGN KEY (Payment_Accepted_id)
 REFERENCES Accepted_Bidding(Accepted_id) ON DELETE CASCADE
);
