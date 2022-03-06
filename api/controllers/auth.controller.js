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
                                 expiresIn: "1m"
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

exports.refresh_token = async (req, res, next) => {

    // Check for token
    if (!req.body.refresh_token) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        const refresh_token = await RefreshToken.findOne({ where: { token: req.body.refresh_token } });

        if (!refresh_token) {
            return res.status(403).json({ message: "Refresh token is not in database!" });
        }

        if (!RefreshToken.isValid(refresh_token)) {

            console.log("token was not valid.");

            await RefreshToken.destroy({ where: { id: refresh_token.id } });
        
            return res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
        }
       
        const user = await refresh_token.getUser();

        const new_token = jwt.sign(
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
            message: "Token refreshed sucessfully!",
            token: new_token,
            refresh_token: refresh_token.token,
        });

    } catch (error) {
        return res.status(500).json({ 
            error: error,
            message: "Internal server error refreshing token"
         });
    }
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