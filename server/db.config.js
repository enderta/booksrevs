const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

console.log(process.env.DB_USER);

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    console.error("Client:", client);
    process.exit(-1);
});

// Execute a simple query
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Query result', res.rows);
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};