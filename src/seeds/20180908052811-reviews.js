const Promise = require('bluebird');

const { Book } = require('../models');
const booksJson = require('./books.json');

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

module.exports = {
  async up(queryInterface) {
    const reviewsBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, reviews }) => {
      const reviewsData = [];
      const BookId = (await Book.findOne({ where: { isbn } })).id;
      reviews.forEach((review) => {
        reviewsData.push({
          BookId,
          comment: review,
          rating: getRandomRating(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
      return queryInterface.bulkInsert('Reviews', reviewsData);
    }, { concurrency: 1000 });

    return reviewsBulkInsertPromises;
  },

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {}),
};
