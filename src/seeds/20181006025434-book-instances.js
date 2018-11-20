const { User, Book } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const books = await Book.findAll({ attributes: ['id'] });
    const instancesData = [];
    users.forEach(({ id }) => {
      Array(4).fill(0).forEach(() => {
        instancesData.push({
          userId: id,
          bookId: books[randint(books.length - 1)].id,
          state: 4,
          comment: 'Almost new, I promise',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });
    return queryInterface.bulkInsert('BookInstances', instancesData);
  },

  down: queryInterface => queryInterface.bulkDelete('BookInstances', null, {}),
};
