const db = require('./db')
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var sessionStore = new MySQLStore({}, db);

module.exports =
session({ 
    secret:"key",
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1800000
    },
    store:sessionStore
});