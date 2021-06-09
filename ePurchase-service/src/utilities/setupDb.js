const dbPool = require('./getDbPool');

const usersDummyData = [
    `INSERT INTO Users (email, user_details, user_cart, user_creds) VALUES('lucky@gmail.com', '{"firstName": "Lucky", "lastName":"Kulkarni", "dob": "12/05/1984", "phone": 7524125896 , "address":"door no 4, 6th main road, near ganesh temple, Mysore-538292, Karnataka" ,"joinedDate": ""}', '[]', '{"password": "lucky"}')`
    // `INSERT INTO Users (email, user_details, user_cart, user_creds) VALUES()`
];
const ProductsDummyData =[
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Asus Zenfone", "description": "an economical phone by Asus", "rating": 3.5 ,"color": "Black", "category": "electronics", "price": 11599, "image": "asus.jpg", "specification":"" }', '[{"sellerId": "Asus@seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Redmi Note 2", "description": "an economical phone by Xiaomi", "rating":4 ,"color": "Black", "category": "electronics", "price": 8599, "image": "redmi.jpg", "specification":"" }', '[{"sellerId": "Xiomi@seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Moto G turbo", "description": "an economical phone by Moto", "rating": 4,"color": "Black", "category": "electronics", "price": 13599, "image": "moto.jpg", "specification":"" }', '[{"sellerId": "Moto@seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Lenovo Vibe X3", "description": "a high end phone by Lenovo", "rating": 4.5,"color": "Black", "category": "electronics", "price": 19999, "image": "lenovo.jpg", "specification":"" }', '[{"sellerId": "Lenovo@deller", "discount": 0.2, "quantity": 666, "shippingCharge": 40}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Iphone 8 plus", "description": "a high end phone by apple", "rating": 4.9,"color": "Rose Gold", "category": "electronics", "price": 19999, "image": "iphone.jpg", "specification":"" }', '[{"sellerId": "Apple@seller", "discount": 0.2, "quantity": 666 , "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Adidas Running Men Lite", "description": "a pair of light weight running shoes by adidas", "rating": 4,"color": "Blue", "category": "shoes", "price": 2599, "image": "adidas-running.jpg", "specification":"" }', '[{"sellerId": "Adidas@seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  // `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"", "description": "", "rating": ,"color": "", "category": "", "price": , "image": "", "specification":"" }', '[{"sellerId": , "discount": , "quantity": , "shippingCharge": }]')`,
  // `INSERT INTO Products (product_details, seller_details) VALUES()`
];
const OrdersDummyData =[
  // `INSERT INTO Orders (order_details, productOrdered) VALUES ('{"userId": "", "orderAmount": "", "orderDate": "" }', '[{"productId": "", "productQty": "", "productPrice": "", "discountApplicable": "" }]')`
];
const TransactionsDummyData =[
  // `INSERT INTO Transactions (order_id) VALUES()`
];

async function createTables(request, response){
  try{
    let createUserTableQuery = `CREATE TABLE Users(
        user_id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE,
        user_details jsonb, user_cart jsonb, user_creds jsonb
    )`;
    let createProductTableQuery = `CREATE TABLE Products(
        product_id SERIAL PRIMARY KEY, product_details jsonb, seller_details jsonb
    )`;
    let createOrderTableQuery = `CREATE TABLE Orders(
        order_id SERIAL PRIMARY KEY, order_details jsonb, product_ordered jsonb
    )`;
    let createTransactionTableQuery = `CREATE TABLE Transactions(
        transaction_id SERIAL PRIMARY KEY, order_id INTEGER NOT NULL, 
        CONSTRAINT fk_order_transaction FOREIGN KEY(order_id) REFERENCES Orders(order_id)
    )`;
    await dbPool.query(createUserTableQuery);
    await dbPool.query(createProductTableQuery);
    await dbPool.query(createOrderTableQuery);
    await dbPool.query(createTransactionTableQuery);
    await insertData(usersDummyData);
    await insertData(ProductsDummyData);
    response.send({ msg: 'Tables created successfully'});
  } catch(e) {
    let err = new Error(e);
    response.status(400).send({ message: err.message});
  }
}

async function insertData(data) {
  try{
    data.forEach(elem => {
        dbPool.query(elem);
    });
  } catch(e) {
    let err = new Error(e);
    response.status(400).send({ message: err.message});
  }
}
  
module.exports = {
  createTables
}