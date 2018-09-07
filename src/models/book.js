module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: DataTypes.STRING,
    format: DataTypes.STRING,
    date_published: DataTypes.DATE,
    description: DataTypes.STRING,
    genres: DataTypes.ARRAY(DataTypes.STRING),
    image_url: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    language: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    publisher: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};