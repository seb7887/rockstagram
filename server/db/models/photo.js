module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('photo', {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING
    },
  });

  Photo.associate = models => {
    Photo.belongsTo(models.User);
  };

  return Photo;
};
