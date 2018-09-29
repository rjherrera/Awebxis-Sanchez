module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
  }, {});
  Interest.associate = (models) => {
    models.Book.belongsToMany(models.User, { through: Interest, as: 'interested', foreignKey: 'bookId' });
    models.User.belongsToMany(models.Book, { through: Interest, as: 'interests', foreignKey: 'userId' });
  };
  return Interest;
};
