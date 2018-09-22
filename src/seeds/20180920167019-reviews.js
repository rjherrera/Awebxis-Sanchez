const Promise = require('bluebird');
const getJSON = require('../lib/seeds/get-json');

const { Book, User } = require('../models');

const Randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  async up(queryInterface) {
    const booksJson = await getJSON('books.json');
    const maxUserId = await User.max('id');
    const reviewsBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, reviews }) => {
      const reviewsData = [];
      const bookId = (await Book.findOne({ where: { isbn } })).id;
      reviews.forEach((review) => {
        reviewsData.push({
          bookId,
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
