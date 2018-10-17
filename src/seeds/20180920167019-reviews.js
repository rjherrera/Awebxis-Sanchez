const Promise = require('bluebird');
const getJSON = require('../lib/seeds/get-json');

const { Book, User } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  async up(queryInterface) {
    const users = await User.findAll({ attributes: ['id'] });
    const booksJson = await getJSON('books.json');
    const reviewsBulkInsertPromises = Promise.map(booksJson.books, async ({ isbn, reviews }) => {
      const reviewsData = [];
      const bookId = (await Book.findOne({ where: { isbn } })).id;
      reviews.forEach((review) => {
        reviewsData.push({
          bookId,
          userId: users[randint(users.length - 1)].id,
          comment: review,
          rating: randint(5),
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
