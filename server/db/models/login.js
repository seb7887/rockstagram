module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Login;
};
