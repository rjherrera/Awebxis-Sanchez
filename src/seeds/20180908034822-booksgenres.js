const Promise = require('bluebird');

const { Book, Genre } = require('../models');
const booksJson = require('./books.json');

module.exports = {
  async up(queryInterface) {
    const genresIds = {};
    const genresObj = (await Genre.findAll({ attributes: ['id', 'name'] }));
    genresObj.forEach((g) => { genresIds[g.name] = g.id; });
    const bookGenresBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, genres }) => {
      const bookGenresData = [];
      const BookId = (await Book.findOne({ where: { isbn } })).id;
      genres.forEach((name) => {
        bookGenresData.push({
          BookId,
          GenreId: genresIds[name],
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
