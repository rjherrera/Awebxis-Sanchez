module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Interests', 'BookId', 'bookId',
  ),
  down: () => { },
};
