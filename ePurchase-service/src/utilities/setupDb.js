const dbPool = require('./getDbPool');

const usersDummyData = [
    `INSERT INTO Users (email, user_details, user_cart, user_creds) VALUES('klmn1@gmail.com', '{"firstName": "anurag", "lastName":"bhadauriya", "dob": "02/09/1995", "phone": 8299425208, "address":"Fatehpur" ,"joinedDate": "02/19/1995"}', '[{"prodId": 121, "prodQty": 5},{"prodId": 123, "prodQty": 8}]', '{"password": "password"}')`
];
const ProductsDummyData =[];
const OrdersDummyData =[];
const TransactionsDummyData =[];

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