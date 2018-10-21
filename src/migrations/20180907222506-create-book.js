module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING,
    },
    datePublished: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.TEXT,
    },
    format: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    isbn: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    language: {
      type: Sequelize.STRING,
    },
    pages: {
      type: Sequelize.INTEGER,
    },
    publisher: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Books'),
};
