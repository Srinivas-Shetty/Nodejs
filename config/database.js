const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create MySQL database connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this value based on your application's requirements
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
  
    connection.release();
});


module.exports.pool = pool;
