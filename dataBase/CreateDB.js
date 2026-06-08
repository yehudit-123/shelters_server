var mysql = require("mysql2");
var path = require("path");

function createDB() {

    var connection = mysql.createConnection({
      host: "localhost",
      user:"root",
      password:"Ofakim123"
    });
    connection.query(`CREATE DATABASE shelters`, function (err, result) {
        if (err) throw err;
        console.log(`shelters DB created`);
        connection.end();
      });
  }
  createDB();
  module.exports = createDB;