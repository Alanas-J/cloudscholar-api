const jwt = require('jsonwebtoken');
const env = require(`../../../config/env.${process.env.NODE_ENV}.config`);

module.exports = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json({ message: "Expired auth token not in header." });
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT.KEY, {ignoreExpiration: true});

        const time = new Date();
        if((decoded.exp*1000) > time.getTime()){
            return res.status(401).json({ message: "You can only refresh an expired token." });
        }

        req.userJWT = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "This token is invalid." });
    }
}
