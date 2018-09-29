module.exports = {
  up: (queryInterface, Sequelize) => {
    const rmCol = queryInterface.removeColumn(
      'Interests',
      'userId',
    );
    const addCol = queryInterface.addColumn(
      'Interests',
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
    );
    return rmCol.then(addCol);
  },
};
