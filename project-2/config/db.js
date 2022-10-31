const mysql = require("mysql2");
const options = require("./options.json");
// https://www.tabnine.com/code/javascript/functions/mysql/createPool
const pool = mysql.createPool(options.mysql);
module.exports = pool.promise();
