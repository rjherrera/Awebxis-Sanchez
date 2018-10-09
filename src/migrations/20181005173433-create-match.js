module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    MatchId1: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'BookInstances',
        key: 'id',
      },
    },
    MatchId2: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'BookInstances',
        key: 'id',
      },
    },
    accepted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Matches'),
};
