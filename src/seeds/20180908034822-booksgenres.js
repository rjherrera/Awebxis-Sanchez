const Promise = require('bluebird');
const getJSON = require('../lib/seeds/get-json');

const { Book, Genre } = require('../models');

module.exports = {
  async up(queryInterface) {
    const booksJson = await getJSON('books.json');
    const genresIds = {};
    const genresObj = (await Genre.findAll({ attributes: ['id', 'name'] }));
    genresObj.forEach((g) => { genresIds[g.name] = g.id; });
    const bookGenresBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, genres }) => {
      const bookGenresData = [];
      const bookId = (await Book.findOne({ where: { isbn } })).id;
      genres.forEach((name) => {
        bookGenresData.push({
          bookId,
          genreId: genresIds[name],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
      return queryInterface.bulkInsert('BookGenres', bookGenresData);
    }, { concurrency: 1000 });

    return bookGenresBulkInsertPromises;
  },

  down: queryInterface => queryInterface.bulkDelete('BookGenres', null, {}),
};
