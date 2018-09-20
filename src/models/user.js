'use strict';
module.exports = (sequelize, DataTypes) => {
    const Follows = sequelize.define('Follows', {
      status: DataTypes.STRING
  });

  const user = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
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
      type: DataTypes.BOOLEAN}
  }, {});

    user.associate = (models) => {
      models.User.hasMany(models.Interest);
      models.User.hasMany(models.Feedback, { as: 'feedbackers', foreignKey: 'feedbackeeId' });
    };
    

  return user;
};