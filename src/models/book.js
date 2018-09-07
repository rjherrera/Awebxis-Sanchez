module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    format: DataTypes.STRING,
    date_published: DataTypes.DATE,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisher: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {});

  Book.associate = (models) => {
    // associations can be defined here
  };

  return Book;
};
