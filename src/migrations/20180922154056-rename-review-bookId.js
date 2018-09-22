module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Reviews', 'BookId', 'bookId',
  ),
  down: () => { },
};
