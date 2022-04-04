const db = require("../../models");
const User = db.users;

module.exports = (req, res, next) => {
    
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
          message: "Email and password fields expected."
        });
        return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
        res.status(400).send({
            message: "Invalid email."
          });
          return;
    }

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