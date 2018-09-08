module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    format: DataTypes.STRING,
    date_published: DataTypes.DATE,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    isbn: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pages: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    publisher: DataTypes.STRING,
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.Review, { as: 'reviews' });
  };

  return Book;
};
