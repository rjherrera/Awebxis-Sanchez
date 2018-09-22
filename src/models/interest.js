module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    userId: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: 'id',
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: 'Book',
      referencesKey: 'id',
      allowNull: false,
    },
  }, {});
  Interest.associate = (models) => {
    models.Book.belongsToMany(models.User, { through: Interest, as: 'interested', foreignKey: 'bookId' });
    models.User.belongsToMany(models.Book, { through: Interest, as: 'interests', foreignKey: 'userId' });
  };
  return Interest;
};
