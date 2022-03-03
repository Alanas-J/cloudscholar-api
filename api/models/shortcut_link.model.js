module.exports = (sequelize, Sequelize) => {
    const ShortcutLink = sequelize.define("cloudscholar_shortcut_link", {
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },      
      order_no: {
        type: Sequelize.INTEGER
      }
    });
    return ShortcutLink;
  };