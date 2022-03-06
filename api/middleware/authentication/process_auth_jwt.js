const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;

module.exports = (req, res, next) => {

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
  
    return res.status(401).json({ message: "Unauthorized!" });
}