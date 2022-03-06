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



module.exports = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userJWT = decoded;

    } catch (error) {

        return handleJWTError(error, res);
    }
    next();
}

function handleJWTError(error, res) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Unauthorized! Access token expired." });
    }
  
    return res.sendStatus(401).json({ message: "Unauthorized!" });
}