const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");

const User = db.users;
const RefreshToken = db.refresh_tokens;


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
                bcrypt.compare(req.body.password, user.password, async (err, result) => {
                    if(err || !result){
                        return res.status(401).json({
                            message: 'Login failed, email or pasword is incorrect.'
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

                        const refresh_token = await RefreshToken.createToken(user);

                        return res.status(200).json({
                             message: "Login success!",
                             token: token,
                             refresh_token: refresh_token
                        });
                    }
                    
                });
            } else{
                res.status(401).json({
                    message: 'Login failed, email or pasword is incorrect.'
                }); 
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal Server Error on Login...',
                error: error
            }); 
        });

}

exports.refreshLogin = (req, res, next) => {
    // Future implementation
}

exports.register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                message: "Some error occurred during registration processing.",
                err: error
            });

        } else {
            const user = {
                email: req.body.email,
                password: hash
            };

            User.create(user)
                .then(data => {
                    res.json(data);
                })
                .catch(error => {
                    res.status(500).send({
                        message: "Some error occurred during registration.",
                        error: error
                    });
                });
        }
    });
}