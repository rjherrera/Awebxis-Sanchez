const usersJson = require('./users.json');

module.exports = {
  up: (queryInterface) => {
    const usersData = [];
    usersJson.forEach((user) => {
      usersData.push({
        id: user.id,
        username: user.name,
        firstName: user.name,
        email: user.email,
        password: user.password,
        admin: user.admin,
        profile_pic_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Users', usersData);
  },

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
