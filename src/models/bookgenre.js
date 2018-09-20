module.exports = (sequelize) => {
  const BookGenre = sequelize.define('BookGenre', {
  }, {});

  BookGenre.associate = (models) => {
    models.Book.belongsToMany(models.Genre, { through: BookGenre });
    models.Genre.belongsToMany(models.Book, { through: BookGenre });
  };

  return BookGenre;
};
