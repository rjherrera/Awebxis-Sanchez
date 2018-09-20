module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'required',
        },
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
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.Review, { as: 'reviews' });
  };

  return Book;
};
