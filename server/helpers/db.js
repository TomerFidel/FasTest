const mysql = require('mysql');

var credentials = {
    connectionLimit: 10,
    host: process.env.DB_HOST || "",
    user: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || ""
}

var connection = mysql.createPool(credentials);

connection.connect(function(err) {
    if (err) throw err;
})

module.exports = connection;