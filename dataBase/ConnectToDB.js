const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ofakim123",
    database: "shelters"
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed");
        console.log(err);
        return;
    }

    console.log("Connected successfully");
});

module.exports = connection;