const bcrypt = require('bcrypt');
const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const usersJson = await getJSON('users.json');
    const usersData = await Promise.all(
      usersJson.map(async user => ({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        admin: user.admin,
        profilePicUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
    return queryInterface.bulkInsert('Users', usersData);
  },

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
