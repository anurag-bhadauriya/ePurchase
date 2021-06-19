const Pool = require('pg').Pool;
const config = {
    user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_dbname,
    password: process.env.pg_password,
    port: process.env.pg_port,
}
const pool = new Pool(config);

module.exports = pool;