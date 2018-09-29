module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING,
  }, {});

  Author.associate = (models) => {
    Author.hasMany(models.Book, { foreignKey: 'authorId' });
  };

  return Author;
};
