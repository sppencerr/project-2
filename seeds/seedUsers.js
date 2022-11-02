const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: 'sepncerr',
        email: 'spencerspencer@gmail.com',
        password: 'p@$$w0rd'
    }
];
const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});
module.exports = seedUsers;