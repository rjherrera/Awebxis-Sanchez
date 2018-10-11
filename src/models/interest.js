module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {});
  Interest.associate = (models) => {
    Interest.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Interest.belongsTo(models.Book, { as: 'book', foreignKey: 'bookId' });
  };
  return Interest;
};
