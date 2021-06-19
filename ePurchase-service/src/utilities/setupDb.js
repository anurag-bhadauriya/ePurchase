const dbPool = require('./getDbPool');

const usersDummyData = [
    `INSERT INTO Users (email, user_details, user_cart, user_creds) VALUES('lucky@gmail.com', '{"firstName": "Lucky", "lastName":"Kulkarni", "dob": "12/05/1984", "phone": 7524125896 , "address":"door no 4, 6th main road, near ganesh temple, Mysore-538292, Karnataka" ,"joinedDate": ""}', '[]', '{"password": "lucky"}')`
    // `INSERT INTO Users (email, user_details, user_cart, user_creds) VALUES()`
];

const ProductsDummyData =[
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Asus Zenfone", "description": "an economical phone by Asus", "rating": 3.5 ,"color": "Black", "category": "Electronics", "price": 11599, "image": "asus.jpg", "specification":"" }', '[{"sellerId": "Asus@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Redmi Note 2", "description": "an economical phone by Xiaomi", "rating": 4 ,"color": "Black", "category": "Electronics", "price": 8599, "image": "redmi.jpg", "specification":"" }', '[{"sellerId": "Xiaomi@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Moto G turbo", "description": "an economical phone by Moto", "rating": 4 ,"color": "Black", "category": "Electronics", "price": 13599, "image": "moto.jpg", "specification":"" }', '[{"sellerId": "Moto@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Lenovo Vibe X3", "description": "a high end phone by Lenovo", "rating": 4.5 ,"color": "Black", "category": "Electronics", "price": 19999, "image": "lenovo.jpg", "specification":"" }', '[{"sellerId": "Lenovo@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"iphone 8 plus", "description": "a high end phone by apple", "rating": 4.9 ,"color": "Rose Gold", "category": "Electronics", "price": 19999, "image": "iphone.jpg", "specification":"" }', '[{"sellerId": "Apple@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Adidas Running Men Lite", "description": "a pair of light weight running shoes by adidas for men", "rating": 4 ,"color": "Blue", "category": "Shoes", "price": 2599, "image": "adidas-running.jpg", "specification":"" }', '[{"sellerId": "Adidas@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Adidas Running Women Lite", "description": "a pair of light weight running shoes by adidas for woman", "rating": 4 ,"color": "Pink", "category": "Shoes", "price": 2599, "image": "adidas-women.jpg", "specification":"" }', '[{"sellerId": "Adidas@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Adidas Running Men robust", "description": "A pair of robust running shoes by adidas for men", "rating": 4 ,"color": "Blue", "category": "Shoes", "price": 3599, "image": "adidas-men.jpeg", "specification":"" }', '[{"sellerId": "Adidas@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Reebok training shoes", "description": "A pair of light weight training shoes by Reebok for men", "rating": 3 ,"color": "Grey", "category": "Shoes", "price": 1599, "image": "Reebok.jpg", "specification":"" }', '[{"sellerId": "Reebok@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Nike Running Men Lite", "description": "a pair of light weight running shoes by Nike for men", "rating": 4.6 ,"color": "Green", "category": "Shoes", "price": 6599, "image": "Nike.jpg", "specification":"" }', '[{"sellerId": "Nike@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Computer Table by Zuari", "description": "sunmica finished zuari computer table", "rating": 4 ,"color": "Beige", "category": "Furniture", "price": 8999, "image": "computer-table.jpeg", "specification":"" }', '[{"sellerId": "Zuari@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Study Table by Zuari", "description": "sunmica finished zuari study table", "rating": 4.3 ,"color": "Coffee Brown", "category": "Furniture", "price": 6999, "image": "study-table.jpg", "specification":"" }', '[{"sellerId": "Zuari@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Dressing Table by Zuari", "description": "sunmica finished zuari Dressing table", "rating": 4 ,"color": "Beige", "category": "Furniture", "price": 2599, "image": "dressing-table.jpg", "specification":"" }', '[{"sellerId": "Zuari@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Recliner sofa set by Grihshobha", "description": "A luxurious and comfortable recliner sofa set by Grihshobha furniture makers", "rating": 4.8 ,"color": "Dark grey", "category": "Furniture", "price": 125000, "image": "sofa.jpg", "specification":"" }', '[{"sellerId": "Grihshobha@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Dining table by @HOME", "description": "Teak wood dining table with glass top", "rating": 4.4 ,"color": "caramel", "category": "Furniture", "price": 18999, "image": "dining-table.jpg", "specification":"" }', '[{"sellerId": "HOME@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Kurta Plazzo set ethnic for women", "description": "embroidery work traditional kurta plazzo set for women", "rating": 4 ,"color": "Cyan", "category": "Clothing", "price": 1499, "image": "kurta.jpeg", "specification":"" }', '[{"sellerId": "Ethnic@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Cotton silk saree by FabIndia", "description": "cotton silk hand woven traditional sarees by Fabindia", "rating": 4.8 ,"color": "Red", "category": "Clothing", "price": 5900, "image": "Fabindia.jpg", "specification":"" }', '[{"sellerId": "FabIndia@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"Modi coat for men ethnic", "description": "Khadi cotton hand woven traditional modi coat for men", "rating": 4.8 ,"color": "yellow", "category": "Clothing", "price": 1900, "image": "modi.png", "specification":"" }', '[{"sellerId": "Ethnic@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"US Polo T-shirt", "description": "100% pure cotton western t-shirt by US polo", "rating": 4.8 ,"color": "White", "category": "Clothing", "price": 3299, "image": "USPA.jpg", "specification":"" }', '[{"sellerId": "USPolo@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`,
  `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"UCB T-shirt", "description": "100% pure cotton western t-shirt by UCB", "rating": 4.2 ,"color": "Black", "category": "Clothing", "price": 1900, "image": "UCB.jpg", "specification":"" }', '[{"sellerId": "UCB@Seller", "discount": 0.2, "quantity": 666, "shippingCharge": 150}]')`
  // `INSERT INTO Products (product_details, seller_details) VALUES('{"name":"", "description": "", "rating": ,"color": "", "category": "", "price": , "image": "", "specification":"" }', '[{"sellerId": , "discount": , "quantity": , "shippingCharge": }]')`,
]

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