module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Photo.associate = models => {
    Photo.hasMany(models.Comment);
    Photo.belongsTo(models.User);
  };

  return Photo;
};
