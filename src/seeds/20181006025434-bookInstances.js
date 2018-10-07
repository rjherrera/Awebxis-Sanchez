const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const instancesJson = await getJSON('bookInstances.json');
    const instancesData = [];
    instancesJson.forEach((instance) => {
      instancesData.push({
        id: instance.id,
        UserId: instance.UserId,
        BookId: instance.BookId,
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
