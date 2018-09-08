const booksJson = require('./books.json');
const { Book } = require('../models');

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

module.exports = {
  async up(queryInterface) {
    const reviewsBulkInsertPromises = await booksJson.books.map(async ({ isbn, reviews }) => {
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
    });
    return Promise.all(reviewsBulkInsertPromises);
  },

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {}),
};
