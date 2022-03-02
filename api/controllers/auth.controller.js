const bcrypt = require('bcrypt');
const db = require("../models");
const Op = db.Sequelize.Op;

const User = db.users;


exports.login = (req, res, next) => {

}

exports.refreshLogin = (req, res, next) => {

}

exports.register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err
            });
        } else {
            const user = {
                email: req.body.email,
                password: hash
              };

              User.create(user)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred during registration."
                    });
                });
        }
    });
}