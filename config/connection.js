const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.LOCKDB_URL
  ? new Sequelize(process.env.LOCKDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3333,
      }
    );

module.exports = sequelize;
