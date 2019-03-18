module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define('PhotoTag', {});

  PhotoTag.associate = models => {
    PhotoTag.belongsTo(models.User);
    PhotoTag.belongsTo(models.Photo);
  };

  return PhotoTag;
};
