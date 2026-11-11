'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    // seeders skip the model, so we must hash the password ourselves
    const password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 10);

    await queryInterface.bulkInsert('user', [
      {
        userType: '0',
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', { userType: '0' });
  },
};
