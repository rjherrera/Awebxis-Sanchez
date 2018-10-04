module.exports = (sequelize) => {
  const BookGenre = sequelize.define('BookGenre', {
  }, {});

  BookGenre.associate = (models) => {
    models.Book.belongsToMany(models.Genre, { through: BookGenre, foreignKey: 'bookId', as: 'genres' });
    models.Genre.belongsToMany(models.Book, { through: BookGenre, foreignKey: 'genreId', as: 'books' });
  };

  return BookGenre;
};
