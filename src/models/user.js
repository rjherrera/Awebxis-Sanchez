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
        notEmpty: true,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    admin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    profile_pic_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {});

  User.associate = (models) => {
    models.User.hasMany(models.Feedback, { as: 'feedbacks', foreignKey: 'feedbackeeId' });
    models.User.hasMany(models.Review);
  };

  return User;
};
