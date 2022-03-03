const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Op = db.Sequelize.Op;

const User = db.users;


exports.login = (req, res, next) => {
    // Validate request.
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
          message: "'email' and 'password' fields expected."
        });
        return;
    }

    User.findOne({where: { email: req.body.email }})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err || !result){
                        return res.status(401).json({
                            message: 'Login failed.'
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                          {
                            email: user.email,
                            userId: user.id
                          },
                          process.env.JWT_KEY,
                          {
                              expiresIn: "1h"
                          }
                        );
                        return res.status(200).json({
                          message: "Login success!",
                          token: token
                        });
                      }
                    
                });
            } else{
                res.status(401).json({
                    message: 'Login failed.'
                }); 
            }
        });

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