module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      tagName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return Hashtag;
};
