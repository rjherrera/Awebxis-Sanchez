module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Books',
    'authorId',
    {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Authors',
        key: 'id',
      },
      onDelete: 'cascade',
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Books',
    'authorId',
  ),
};
