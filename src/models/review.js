module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'must be a non-negative rating',
        },
        max: {
          args: [5],
          msg: 'must be less than or equal to 5',
        },
      },
    },
  }, {});

  Review.associate = (models) => {
    Review.belongsTo(models.Book, { foreignKey: 'bookId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Review;
};
