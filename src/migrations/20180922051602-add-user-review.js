module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Reviews',
    'UserId',
    {
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
    'UserId',
  ),
};
