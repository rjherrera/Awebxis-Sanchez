const Promise = require('bluebird');

const { Book, User } = require('../models');
const booksJson = require('./books.json');

const Randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  async up(queryInterface) {
    const maxUserId = await User.max('id');
    const reviewsBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, reviews }) => {
      const reviewsData = [];
      const BookId = (await Book.findOne({ where: { isbn } })).id;
      reviews.forEach((review) => {
        reviewsData.push({
          BookId,
          userId: Randint(maxUserId),
          comment: review,
          rating: Randint(5),
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
