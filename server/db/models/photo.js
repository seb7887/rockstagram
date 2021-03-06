module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
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
      comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Photo.associate = models => {
    Photo.hasMany(models.Comment);
    Photo.belongsTo(models.User);
    Photo.hasMany(models.Like);
  };

  return Photo;
};
