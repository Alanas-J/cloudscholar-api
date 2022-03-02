module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("cloudscholar_class", {
      day: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      description: {
        type: Sequelize.STRING(512)
      }
    });
    return Class;
  };