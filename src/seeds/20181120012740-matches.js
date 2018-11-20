const { User } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const matchesData = [];
    const proposersBooksIds = await Promise.all(users.map(async (user) => {
      const proposerBooks = await user.getUserBooks();
      return proposerBooks[0].id;
    }));
    const proposeesBooksIds = await Promise.all(users.map(async ({ id }) => {
      const proposee = await User.findById((id % users.length) + 1);
      const proposeeBooks = await proposee.getUserBooks();
      return proposeeBooks[0].id;
    }));
    for (let i = 0; i < users.length; i += 1) {
      matchesData.push({
        proposerBookInstanceId: proposersBooksIds[i],
        proposeeBookInstanceId: proposeesBooksIds[i],
        accepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Matches', matchesData);
  },

  down: queryInterface => queryInterface.bulkDelete('Matches', null, {}),
};
