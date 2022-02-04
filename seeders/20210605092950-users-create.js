'use strict';
var faker = require('faker');
module.exports = {
up: async (queryInterface, Sequelize) => {
var data = [];
  for(var i=0; i<20; ++i)
   {
      data.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: i == 0 ? 'admin': (i%2 == 0 ? 'author' : 'guest'),
      createdAt: new Date(),
      updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Users', data, {}); 
},
down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete('Users', null, {});
}
};