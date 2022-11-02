const seedUsers = require('./seedUsers');

const seedPosts = require('./seedPosts');

const seedComments = require('./seedComments');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('========================================================');
  await seedUsers();
  console.log('========================================================');

  await seedPosts();
  console.log('========================================================');

  await seedComments();
  console.log('========================================================');

  process.exit(0);
};

seedAll();