const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "toor",
 database: "BookStore",
});

conn.connect();

module.exports = conn;