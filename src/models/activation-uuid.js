module.exports = (sequelize, DataTypes) => {
  const ActivationUuid = sequelize.define('ActivationUuid', {
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
  }, {});
  return ActivationUuid;
};
