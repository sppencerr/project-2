const sequelize = require('../config/connection');
const { Cat, Comment, Post, User } = require('../models');

const catSeedData = require('./catSeedData.json');
const userSeedData = require('./userSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userSeedData, { individualHooks: true })
  await Cat.bulkCreate(catSeedData)
}




seedDatabase();