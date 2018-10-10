module.exports = {
  up: (queryInterface, Sequelize) => {
    const rmCol = queryInterface.removeColumn(
      'Books',
      'author',
    );
    const addCol = queryInterface.addColumn(
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
    );
    return rmCol.then(addCol);
  },
  down: (queryInterface, Sequelize) => {
    const rmCol = queryInterface.removeColumn(
      'Books',
      'authorId',
    );
    const addCol = queryInterface.addColumn(
      'Books',
      'author',
      {
        type: Sequelize.STRING,
      },
    );
    return rmCol.then(addCol);
  },
};
