module.exports = (sequelize, DataTypes) => {
  const BookInstance = sequelize.define('BookInstance', {
    state: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {});
  BookInstance.associate = (models) => {
    BookInstance.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });
    BookInstance.belongsTo(models.Book, { as: 'book', foreignKey: 'BookId' });
  };
  return BookInstance;
};
