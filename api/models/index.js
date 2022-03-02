const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = require("./user.model")(sequelize, Sequelize);

db.subjects = require("./subject.model")(sequelize, Sequelize);

db.classes = require("./class.model")(sequelize, Sequelize);

db.tasks = require("./task.model")(sequelize, Sequelize);

db.shortcut_links = require("./shortcut_link.model")(sequelize, Sequelize);


db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

module.exports = db; // Exports a configured sequelize connection/models and Sequelize.
