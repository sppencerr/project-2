//import sequelize constructor
const Sequelize = require('sequelize');
// import environment variables
require('dotenv').config();
let sequelize;

// check for and use JAWSDB if available
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
};

module.exports = sequelize;