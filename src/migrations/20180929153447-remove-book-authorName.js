module.exports = {
  up: queryInterface => queryInterface.removeColumn(
    'Books',
    'author',
  ),
};
