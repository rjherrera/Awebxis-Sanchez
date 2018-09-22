const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const interestsJson = await getJSON('interests.json');
    const interestsData = [];
    interestsJson.forEach((interest) => {
      interestsData.push({
        id: interest.id,
        UserId: interest.UserId,
        BookId: interest.BookId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Interests', interestsData);
  },

  down: queryInterface => queryInterface.bulkDelete('Interests', null, {}),
};
