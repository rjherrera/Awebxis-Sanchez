const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const genresJson = await getJSON('genres.json');
    const genresData = [];
    genresJson.genres.forEach((name) => {
      genresData.push({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Genres', genresData);
  },

  down: queryInterface => queryInterface.bulkDelete('Genres', null, {}),
};
