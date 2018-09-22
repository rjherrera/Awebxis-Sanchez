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
    profilePicUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'must be a valid url',
        },
      },
    },
  }, {});

  User.associate = (models) => {
    models.User.hasMany(models.Feedback, { as: 'feedbacks', foreignKey: 'feedbackeeId' });
    models.User.hasMany(models.Review, { foreignKey: 'userId' });
  };

  return User;
};
