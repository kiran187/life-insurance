var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"project03_nodejs"
});

var exe = util.promisify(conn.query).bind(conn);

 module.exports = exe;