const chrono = require('chrono-node');
const booksJson = require('./books.json');

module.exports = {
  up: (queryInterface) => {
    const booksData = [];
    booksJson.books.forEach((book) => {
      booksData.push({
        author: book.author,
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
