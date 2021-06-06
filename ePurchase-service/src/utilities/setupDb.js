const dbPool = require('./getDbPool');

const UserDummyData = [
    `INSERT INTO Users ( firstName, lastName, email ,dob, phone, cartDetails, address) VALUES('Anurag', 'Bhadauriya' ,'ab02091995@gmail.com', '02-Sept-1995', '8299425208', '[{"a": 1},{"b": 2}]', 'Fatehpur')`
];
const UserCreds =[];
const Products =[];
const Orders =[];
const Transactions =[];

async function createTables(request, response){
  try{
    let userQuery = `CREATE TABLE Users(
        userId SERIAL PRIMARY KEY, firstName TEXT NOT NULL,
        lastName TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
        dob TEXT, phone TEXT, cartDetails jsonb, address TEXT)`;
    let userCredsQuery = `CREATE TABLE UserCreds(
        credId SERIAL PRIMARY KEY, userId INTEGER NOT NULL, 
        userMail TEXT NOT NULL UNIQUE, userPass TEXT NOT NULL,
        CONSTRAINT fk_creds_user FOREIGN KEY(userId) REFERENCES Users(userId) ON DELETE CASCADE)`;
    let productsQuery = `CREATE TABLE Products(
        productId SERIAL PRIMARY KEY, productName TEXT NOT NULL, description TEXT , rating TEXT,
        category TEXT, price INTEGER, color TEXT, image TEXT, 
        specifications TEXT, discount TEXT, quantity INTEGER, shippingCharge INTEGER)`;
    let ordersQuery = `CREATE TABLE Orders(
        orderId SERIAL PRIMARY KEY, userId INTEGER NOT NULL, userEmailId TEXT NOT NULL,
        orderAmount INTEGER NOT NULL, orderData jsonb, CONSTRAINT fk_order_user
        FOREIGN KEY(userId) REFERENCES Users(userId))`;
    let transactionsQuery = `CREATE TABLE Transactions(
        transactionId SERIAL PRIMARY KEY, orderId INTEGER NOT NULL, CONSTRAINT fk_order_transaction
        FOREIGN KEY(orderId) REFERENCES Orders(orderId))`;
    
    await dbPool.query(userQuery);
    await dbPool.query(userCredsQuery);
    await dbPool.query(productsQuery);
    await dbPool.query(ordersQuery);
    await dbPool.query(transactionsQuery);
    await insertData(UserDummyData);
    // await insertData(UserCreds);
    // await insertData(Products);
    // await insertData(Orders);
    // await insertData(Transactions);
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