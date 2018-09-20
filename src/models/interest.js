'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    UserId: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: 'id',
      allowNull: false
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: 'Book',
      referencesKey: 'id',
      allowNull: false
    }
  }, {});
  Interest.associate = function(models) {
    models.Book.belongsToMany(models.User, { through: Interest });
    models.User.belongsToMany(models.Book, { through: Interest, as: 'interests'});
  };
  return Interest;
};