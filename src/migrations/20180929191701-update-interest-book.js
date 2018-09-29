module.exports = {
  up: (queryInterface, Sequelize) => {
    const rmCol = queryInterface.removeColumn(
      'Interests',
      'bookId',
    );
    const addCol = queryInterface.addColumn(
      'Interests',
      'bookId',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    );
    return rmCol.then(addCol);
  },
};
