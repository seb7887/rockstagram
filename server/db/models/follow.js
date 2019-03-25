module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    'Follow',
    {},
    {
      freezeTableName: true,
    },
  );

  Follow.associate = models => {
    Follow.belongsTo(models.User, { foreignKey: 'followingId' });
    Follow.belongsTo(models.User, { foreignKey: 'followerId' });
  };

  return Follow;
};
