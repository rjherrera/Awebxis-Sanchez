const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const instancesJson = await getJSON('book-instances.json');
    const instancesData = [];
    instancesJson.bookInstances.forEach((instance) => {
      instancesData.push({
        userId: instance.userId,
        bookId: instance.bookId,
        state: instance.state,
        comment: instance.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('BookInstances', instancesData);
  },

  down: queryInterface => queryInterface.bulkDelete('BookInstances', null, {}),
};
