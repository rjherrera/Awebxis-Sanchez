const _ = require('lodash');
const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const authorsJson = await getJSON('authors.json');
    const authorsData = [];
    authorsJson.authors.forEach((name) => {
      authorsData.push({
        name,
        kebabName: _.kebabCase(name),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Authors', authorsData);
  },

  down: queryInterface => queryInterface.bulkDelete('Authors', null, {}),
};
