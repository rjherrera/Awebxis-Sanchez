const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const followsJson = await getJSON('follows.json');
    const followsData = [];
    followsJson.forEach((follow) => {
      followsData.push({
        followerId: follow.followerId,
        followeeId: follow.followeeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Follows', followsData);
  },

  down: queryInterface => queryInterface.bulkDelete('Follows', null, {}),
};
