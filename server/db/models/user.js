module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically get converted to SERIAL for postgres
    },
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
  });

  User.associate = models => {
    User.hasMany(models.Photo);
    User.hasMany(models.Comment);
    User.hasMany(models.Follow);
    User.hasMany(models.Like);
  };

  return User;
};
