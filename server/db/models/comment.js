module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      commentText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Photo);
  };

  return Comment;
};
