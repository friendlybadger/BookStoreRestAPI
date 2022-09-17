const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "<password>",
 database: "BookStore",
});

conn.connect();

module.exports = conn;
