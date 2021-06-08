const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');

// Environment configurations
const dotEnv = require('dotenv');
const envConfig = process.env.CONFIG || 'dev';
dotEnv.config({ path: path.resolve(__dirname, `./environment/.env.${envConfig}`) });
const createDb = require('./utilities/setupdb');
const userRouter = require('./routes/UserRouting');
const productRouter = require('./routes/productRouting');
const orderRouter = require('./routes/orderRouting');
const transactionRouter = require('./routes/transactionRouting');

//App configuration
const app = express();
const port = process.env.service_port;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger); //Request Logging
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/transaction', transactionRouter);
app.use(errorLogger); // Error Logging
app.get('/setupdb', createDb.createTables);

//Listener
app.listen(port , ()=>{
    console.log(`ePurchase service running at port ${port}`);
});