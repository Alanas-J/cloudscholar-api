const db = require("../models");
const User = db.users;

module.exports = (req, res, next) => {
    
    // Validate body contents (will need regex later).
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
          message: "Email and password fields expected."
        });
        return;
    }

    // Check if email is unique.
    User.findOne({where: { email: req.body.email }})
        .then(user => {
            if (user) {
                res.status(400).send({
                    message: "This email is already in use."
                });
                return;
            }
    
        next();
        });
}