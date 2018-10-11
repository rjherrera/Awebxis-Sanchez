module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    scopes: {
      withBook: () => ({
        include: [{ model: sequelize.models.Book.scope('withAuthor'), as: 'book' }],
      }),
      withUser: () => ({
        include: [{ model: sequelize.models.User, as: 'user' }],
      }),
    },
  });
  Interest.associate = (models) => {
    Interest.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Interest.belongsTo(models.Book, { as: 'book', foreignKey: 'bookId' });
  };
  return Interest;
};
