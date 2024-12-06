var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host: "bdq7ljmg1sa8atf51kpi-mysql.services.clever-cloud.com",
    user: "ue4tkz6bg2rqygtw",
    password: "ue4tkz6bg2rqygtw",
    database:"bdq7ljmg1sa8atf51kpi"
});

var exe = util.promisify(conn.query).bind(conn);

 module.exports = exe;
