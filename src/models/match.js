module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    MatchId1: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    MatchId2: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: true,
        },
      },
    },
  }, {});
  Match.associate = (models) => {
    Match.belongsTo(models.BookInstance, { foreignKey: 'MatchId1' });
    Match.belongsTo(models.BookInstance, { foreignKey: 'MatchId2' });
  };
  return Match;
};
