const getJSON = require('../lib/seeds/get-json');
const { User, Book } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const books = await Book.findAll({ attributes: ['id'] });
    const instancesJson = await getJSON('book-instances.json');
    const instancesData = [];
    instancesJson.bookInstances.forEach((instance) => {
      instancesData.push({
        userId: users[randint(users.length - 1)].id,
        bookId: books[randint(books.length - 1)].id,
        state: instance.state,
        comment: instance.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('BookInstances', instancesData);
  },

  down: queryInterface => queryInterface.bulkDelete('BookInstances', null, {}),
};
