const chrono = require('chrono-node');
const getJSON = require('../lib/seeds/get-json');

const { Author } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const booksJson = await getJSON('books.json');
    const booksData = [];
    const authors = await Author.findAll();
    const authorsIds = {};
    authors.forEach((a) => { authorsIds[a.name] = a.id; });
    booksJson.books.forEach((book) => {
      const authorId = authorsIds[book.author];
      booksData.push({
        authorId,
        format: book.book_format,
        datePublished: chrono.parseDate(book.date_published),
        description: book.description,
        imageUrl: book.img_url,
        isbn: book.isbn,
        language: book.language,
        pages: book.pages,
        publisher: book.publisher,
        title: book.title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Books', booksData);
  },

  down: queryInterface => queryInterface.bulkDelete('Books', null, {}),
};
