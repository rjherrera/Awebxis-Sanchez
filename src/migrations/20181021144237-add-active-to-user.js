module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'active',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Users',
    'active',
  ),
};
