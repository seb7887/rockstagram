module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      following: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
    },
  );

  User.associate = models => {
    User.hasOne(models.Login, {
      foreignKey: 'email',
      sourceKey: 'email',
      constraints: false,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    User.hasMany(models.Comment);
    User.hasMany(models.Photo, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Like);
  };

  return User;
};
