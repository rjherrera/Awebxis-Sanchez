module.exports = (sequelize, DataTypes) => {
  const Follows = sequelize.define('Follows', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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

  Follows.associate = (models) => {
    models.User.belongsToMany(models.User, { through: Follows, as: 'followers', foreignKey: 'followeeId' });
    models.User.belongsToMany(models.User, { through: Follows, as: 'following', foreignKey: 'followerId' });
  };

  return Follows;
};
