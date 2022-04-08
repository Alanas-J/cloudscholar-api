const {DATABASE} = require(`../../config/env.${process.env.NODE_ENV}.config.js`);
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE.DB, DATABASE.USER, DATABASE.PASSWORD, {
    host: DATABASE.HOST,
    dialect: DATABASE.dialect,
    dialectOptions: {
        ssl: 'Amazon RDS'
    },
    pool: {
        max: DATABASE.pool.max,
        min: DATABASE.pool.min,
        acquire: DATABASE.pool.acquire,
        idle: DATABASE.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

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

db.refresh_tokens = require("./authentication/refresh_token.model")(sequelize, Sequelize);
db.users.hasMany(db.refresh_tokens, {foreignKey: 'user_id', targetKey: 'id'});
db.refresh_tokens.belongsTo(db.users, {as: "user", foreignKey: 'user_id', targetKey: 'id'});

module.exports = db; 
