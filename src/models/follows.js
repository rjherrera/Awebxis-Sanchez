module.exports = (sequelize, DataTypes) => {
  const Follows = sequelize.define('Follows', {
    followeeId: {
      type: DataTypes.INTEGER,
      references: 'followee',
      referencesKey: 'id',
      allowNull: false,
    },
    followerId: {
      type: DataTypes.INTEGER,
      references: 'follower',
      referencesKey: 'id',
      allowNull: false,
    },
  }, {});

  Follows.associate = function (models) {
    models.User.belongsToMany(models.User, { through: Follows, as: 'followers', foreignKey: 'followerId' });
    models.User.belongsToMany(models.User, { through: Follows, as: 'following', foreignKey: 'followeeId' });
    Follows.belongsTo(models.User, { foreignKey: 'followeeId' });
    Follows.belongsTo(models.User, { foreignKey: 'followerId' });
  };
  return Follows;
};
