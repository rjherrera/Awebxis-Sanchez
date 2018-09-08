module.exports = {
  up: (queryInterface) => {
    const booksData = [];
    for (let i = 0; i < 1; i += 1) {
      booksData.push({
        author: 'Dan Brown',
        format: 'Paperback',
        date_published: new Date(),
        description: 'this is a description ... a big description',
        image_url: 'this is a url',
        isbn: '9780307277671',
        language: 'English',
        pages: 481,
        publisher: 'Anchor',
        title: 'The Da Vinci Code',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Books', booksData);
  },

  down: queryInterface => queryInterface.bulkDelete('books', null, {}),
};
