module.exports = (sequelize, DataTypes) => {
  const BookInstance = sequelize.define('BookInstance', {
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
    expired: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {
    scopes: {
      active: {
        where: {
          expired: false,
        },
      },
      withBook: () => ({
        include: [{ model: sequelize.models.Book.scope('withAuthor'), as: 'book' }],
      }),
      withUser: () => ({
        include: [{ model: sequelize.models.User, as: 'user' }],
      }),
    },
  });

  BookInstance.prototype.swap = async function swap(otherInstance) {
    await this.update({ expired: true });
    await otherInstance.update({ expired: true });
    const firstInstance = BookInstance.create({
      userId: otherInstance.userId,
      bookId: this.bookId,
      state: this.state,
      comment: this.comment,
    });
    const secondInstance = BookInstance.create({
      userId: this.userId,
      bookId: otherInstance.bookId,
      state: otherInstance.state,
      comment: otherInstance.comment,
    });
    return Promise.all([firstInstance, secondInstance]);
  };

  BookInstance.associate = (models) => {
    BookInstance.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    BookInstance.belongsTo(models.Book, { as: 'book', foreignKey: 'bookId' });
  };
  return BookInstance;
};
