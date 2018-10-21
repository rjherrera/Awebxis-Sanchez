module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    proposerBookInstanceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'BookInstances',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    proposeeBookInstanceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'BookInstances',
        key: 'id',
      },
      onDelete: 'cascade',
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
