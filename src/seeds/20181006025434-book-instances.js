const getJSON = require('../lib/seeds/get-json');
const { User, Book } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const instancesJson = await getJSON('book-instances.json');
    const users = await User.findAll({ attributes: ['id', 'username'] });
    const books = await Book.findAll({ attributes: ['id', 'isbn'] });
    const instancesData = [];
    instancesJson.bookInstances.forEach((instance) => {
      instancesData.push({
        userId: users.find(user => user.username === instance.username).id,
        bookId: books.find(book => book.isbn === instance.isbn).id,
        state: 4,
        comment: 'Almost new, I promise.',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('BookInstances', instancesData);
  },

  down: queryInterface => queryInterface.bulkDelete('BookInstances', null, {}),
};
