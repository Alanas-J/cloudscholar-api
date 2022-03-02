module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("cloudscholar_task", {
      name: {
        type: Sequelize.STRING
      },
      due_datetime: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING(512)
      }
    });
    return Task;
  };