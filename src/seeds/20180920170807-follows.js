const { User } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const followsData = [];
    Array(200).fill(0).forEach(() => {
      const firstId = users[randint(users.length - 1)].id;
      followsData.push({
        followerId: firstId,
        followeeId: users.filter(u => u.id !== firstId)[randint(users.length - 2)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Follows', followsData);
  },

  down: queryInterface => queryInterface.bulkDelete('Follows', null, {}),
};
