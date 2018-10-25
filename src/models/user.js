const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [[6, 20]],
          msg: 'Password needs to be between 6 and 20 characters long',
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: 'Needs to be a valid email',
        },
      },
      unique: true,
    },
    admin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    active: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    profilePicUrl: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      async beforeSave(instance) {
        if (instance.changed('password')) {
          instance.set('password', await bcrypt.hash(instance.password, 10));
        }
      },
      async afterCreate(instance) {
        await sequelize.models.ActivationUuid.create({ userId: instance.id });
      },
    },
    getterMethods: {
      async uuid() {
        const activation = await this.getActivation();
        return activation.uuid;
      },
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  });

  User.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Feedback, { as: 'feedbacks', foreignKey: 'feedbackeeId' });
    User.hasMany(models.Review, { as: 'reviews', foreignKey: 'userId' });
    User.hasMany(models.BookInstance, { as: 'userBooks', foreignKey: 'userId' });
    User.belongsToMany(models.Book,
      { through: models.Interest, as: 'interestedBooks', foreignKey: 'userId' });
    User.hasMany(models.Interest, { as: 'interests', foreignKey: 'userId' });
    User.hasOne(models.ActivationUuid, { as: 'activation', foreignKey: 'userId' });
  };

  return User;
};
