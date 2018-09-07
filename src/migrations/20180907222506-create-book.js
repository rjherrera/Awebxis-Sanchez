module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    isbn: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING,
    },
    format: {
      type: Sequelize.STRING,
    },
    date_published: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    genres: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    image_url: {
      type: Sequelize.STRING,
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
