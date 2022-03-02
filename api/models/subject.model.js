module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("cloudscholar_subject", {
      day: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      colour: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      }
    });
    return Subject;
  };