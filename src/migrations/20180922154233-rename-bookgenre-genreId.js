module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'BookGenres', 'GenreId', 'genreId',
  ),
  down: () => { },
};
