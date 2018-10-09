module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'BookInstances',
    'expired',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'BooksInstances',
    'expired',
  ),
};
