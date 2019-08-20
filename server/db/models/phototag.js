module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define(
    'PhotoTag',
    {},
    {
      freezeTableName: true,
    },
  );

  PhotoTag.associate = models => {
    PhotoTag.belongsTo(models.User);
    PhotoTag.belongsTo(models.Photo);
  };

  return PhotoTag;
};
