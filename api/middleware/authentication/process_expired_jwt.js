const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;


// Does the auth header have a JWT?
// if NOT - no token found error.

// Is the JWT expired?
// if NOT - token active error.

// Is there a refresh token attached?
// if NOT - no token error.

// Need to implement check if JWT is linked to the refresh token.
// Send onto next.

// Else token and JWT not related

// Alternative: process expired jwt
// Just check if a JWT is present and expired.
// else error.

// Controller checks if the token contents are linked to the refresh.

module.exports = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json({ message: "Expired auth token not in header." });
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY, {ignoreExpiration: true});

        const time = new Date;
        if(time.getTime()/1000 < decoded.exp){
            return res.status(401).json({ message: "You can only refresh an expired token." });
        }

        req.userJWT = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "This token is invalid." });
    }
}
