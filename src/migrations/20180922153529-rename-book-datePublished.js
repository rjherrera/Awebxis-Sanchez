module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Books', 'date_published', 'datePublished',
  ),
  down: () => { },
};
