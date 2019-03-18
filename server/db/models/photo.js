module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
    },
  });

  Photo.associate = models => {
    Photo.hasMany(models.Comment);
    Photo.belongsTo(models.User);
  };

  return Photo;
};
