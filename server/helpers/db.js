const mysql = require('mysql');

class DBConnection {
    constructor() {
        var credentials = {
            host: process.env.DB_HOST || "",
            user: process.env.DB_USERNAME || "",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || ""
        }
        console.log("Started DBConnection");
        console.log(credentials);
        this.connection = mysql.createConnection(credentials)
        
        this.connection.connect((err) => {
            if (err) throw err;
            console.log("Connected");
        })
    }
}

module.exports = DBConnection;