module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'required',
        },
      },
    },
    kebabName: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
  }, {});

  Author.associate = (models) => {
    Author.hasMany(models.Book, { as: 'books', foreignKey: 'authorId' });
  };

  return Author;
};
