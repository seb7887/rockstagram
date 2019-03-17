module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follow', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  return Follow;
};