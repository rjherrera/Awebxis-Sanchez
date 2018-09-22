module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedbackerId: {
      type: DataTypes.INTEGER,
      references: 'user',
      referencesKey: 'id',
      allowNull: false,
    },
    feedbackeeId: {
      type: DataTypes.INTEGER,
      references: 'user',
      referencesKey: 'id',
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {});
  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, { foreignKey: 'feedbackeeId' });
  };
  return Feedback;
};
