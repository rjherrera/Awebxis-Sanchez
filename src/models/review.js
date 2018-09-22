module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  }, {});

  Review.associate = (models) => {
    Review.belongsTo(models.Book, { foreignKey: 'bookId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Review;
};
