const db = require("../models");
const User = db.users;
const Subjects = db.subjects;
const Tasks = db.tasks;
const Classes = db.classes;
const ShortcutLinks= db.shortcut_links;

exports.getById = (req, res, next) => {

    console.log(req.params.id);

    User.findByPk(req.params.id, { include: [
            {
                association: "subjects",
                include: ["classes", "tasks"]
            },
            {
                association: "shortcut_links"
            }]
        })
        .then(data => {

            console.log(data);

            if (data) {
                console.log(data);
                res.send(data);
            } else {
            res.status(404).send({
                message: `Cannot find Tutorial with id=${req.params.id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Tutorial with id=" + req.params.id
            });
        });

};

exports.updateById = (req, res, next) => {

};