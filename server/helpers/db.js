const mysql = require('promise-mysql');
var createError = require("http-errors");

var DBConnection = async function() {
    var credentials = {
        host: process.env.DB_HOST || "",
        user: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || ""
    }

    try {
        var connection = await mysql.createConnection(credentials);
        var conn = await connection.connect();
    }catch(err) {
        throw err;
    }

    return conn;
}

module.exports = DBConnection;