module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Photo);
  };

  return Comment;
};
