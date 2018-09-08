module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {});

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Book, { through: 'BookId' });
  };

  return Genre;
};
