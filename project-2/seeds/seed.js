const sequelize = require('../config/connection');
const { Cat, Comment, Post, User, Topic } = require('../models');

const topicSeedData = require('./topicSeedData.json');
const userSeedData = require('./userSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userSeedData, { individualHooks: true })
  await Topic.bulkCreate(topicSeedData)
}




seedDatabase();