module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    matchId1: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    // Por convención, matchId1 será la instancia del libro de la persona que propuso el match,
    // y matchId2 el que debe aceptar (para que no te aceptes tu misma propuesta)
    matchId2: {
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
    Match.belongsTo(models.BookInstance, { foreignKey: 'matchId1', as: 'instance1' });
    Match.belongsTo(models.BookInstance, { foreignKey: 'matchId2', as: 'instance2' });
  };
  return Match;
};
