module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'BookGenres', 'BookId', 'bookId',
  ),
  down: () => { },
};
