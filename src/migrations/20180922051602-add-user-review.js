module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Reviews',
    'userId',
    {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Reviews',
    'userId',
  ),
};
