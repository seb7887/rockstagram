module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {});

  Like.associate = models => {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Photo);
  };

  return Like;
};
