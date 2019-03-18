module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  });

  User.associate = models => {
    User.hasMany(models.Comment);
    User.hasMany(models.Photo);
    User.hasMany(models.Like);
  };

  return User;
};
