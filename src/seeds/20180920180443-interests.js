const { User, Book } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const books = await Book.findAll({ attributes: ['id'] });
    const interestsData = [];
    users.forEach(({ id }) => {
      interestsData.push({
        userId: id,
        bookId: books[randint(books.length - 1)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Interests', interestsData);
  },

  down: queryInterface => queryInterface.bulkDelete('Interests', null, {}),
};
