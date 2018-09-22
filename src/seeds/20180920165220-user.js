const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const usersJson = await getJSON('users.json');
    const usersData = [];
    usersJson.forEach((user) => {
      usersData.push({
        username: user.name,
        firstName: user.name,
        email: user.email,
        password: user.password,
        admin: user.admin,
        profilePicUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Users', usersData);
  },

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
