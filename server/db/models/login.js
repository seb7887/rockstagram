module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define(
    'Login',
    {
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Login.associate = models => {
    Login.belongsTo(models.User, {
      foreignKey: 'email',
      targetKey: 'email',
      onDelete: 'cascade',
    });
  };

  return Login;
};
