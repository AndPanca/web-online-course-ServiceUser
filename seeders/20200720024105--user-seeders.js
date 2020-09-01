'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: "andri",
        profession: "Admin Micro",
        role: "admin",
        email: "andri@gmail.com",
        password: await bcrypt.hash('rahasia123', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "panca",
        profession: "Web Design and Development",
        role: "student",
        email: "panca@gmail.com",
        password: await bcrypt.hash('rahasiaku123', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
