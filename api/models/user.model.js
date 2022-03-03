module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("cloudscholar_user", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return User;
  };