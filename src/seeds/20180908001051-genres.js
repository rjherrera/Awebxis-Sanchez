const genresJson = require('./genres.json');

module.exports = {
  up: (queryInterface) => {
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
