module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    MatchId1: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    // Por convención, MatchId1 será la instancia del libro de la persona que propuso el match,
    // y MatchId2 el que debe aceptar (para que no te aceptes tu misma propuesta)
    MatchId2: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true,
      },
    },
  }, {});
  Match.associate = (models) => {
    Match.belongsTo(models.BookInstance, { foreignKey: 'MatchId1', as: 'instance1' });
    Match.belongsTo(models.BookInstance, { foreignKey: 'MatchId2', as: 'instance2' });
  };
  return Match;
};
