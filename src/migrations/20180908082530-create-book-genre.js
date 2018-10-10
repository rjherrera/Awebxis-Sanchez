module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BookGenres', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bookId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Books',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    genreId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Genres',
        key: 'id',
      },
      onDelete: 'cascade',
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
  down: queryInterface => queryInterface.dropTable('BookGenres'),
};
