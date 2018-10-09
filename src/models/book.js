const validateISBN = require('../lib/models/isbn-validation');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    format: DataTypes.STRING,
    datePublished: DataTypes.DATE,
    description: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'must be a valid url',
        },
      },
    },
    isbn: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isISBN(value) {
          if (!validateISBN(value)) {
            throw new Error('must be a valid ISBN');
          }
        },
      },
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'required',
        },
      },
    },
    pages: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'must be a non-negative number',
        },
      },
    },
    publisher: DataTypes.STRING,
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'required',
        },
      },
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.Review, { foreignKey: 'bookId' });
    Book.belongsTo(models.Author, { as: 'author', foreignKey: 'authorId' });
    Book.hasMany(models.BookInstance, { as: 'instances', foreignKey: 'bookId' });
  };

  return Book;
};
