const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
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
db.users.hasMany(db.subjects, { as: "subjects", foreignKey: "user_id", onDelete: 'cascade', hooks: true});
db.subjects.belongsTo(db.users, {as: "subject_user", foreignKey: "user_id"});

db.classes = require("./class.model")(sequelize, Sequelize);
db.subjects.hasMany(db.classes, {as: "classes", foreignKey: "subject_id", onDelete: 'cascade', hooks: true});
db.classes.belongsTo(db.subjects, {as: "class_subject", foreignKey: "subject_id"});

db.tasks = require("./task.model")(sequelize, Sequelize);
db.subjects.hasMany(db.tasks, { as: "tasks", foreignKey: "subject_id", onDelete: 'cascade', hooks: true});
db.tasks.belongsTo(db.subjects, {as: "task_subject", foreignKey: "subject_id"});

db.shortcut_links = require("./shortcut_link.model")(sequelize, Sequelize);
db.users.hasMany(db.shortcut_links, { as: "shortcut_links",  foreignKey: "user_id", onDelete: 'cascade', hooks: true});
db.shortcut_links.belongsTo(db.users, {as: "shortcut_link_user",  foreignKey: "user_id",});




// ===================================================================
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

module.exports = db; // Exports a configured sequelize connection/models and Sequelize.
