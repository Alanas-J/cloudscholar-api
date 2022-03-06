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


// CloudScholar Models
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


// JWT Refresh Token
db.refresh_tokens = require("./authentication/refresh_token.model")(sequelize, Sequelize);
db.users.hasOne(db.refresh_tokens, {foreignKey: 'user_id', targetKey: 'id'});
db.refresh_tokens.belongsTo(db.users, {as: "user", foreignKey: 'user_id', targetKey: 'id'});

module.exports = db; // Exports a configured sequelize connection/models and Sequelize.
