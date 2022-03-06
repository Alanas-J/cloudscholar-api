const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refresh_token", {
        token: {
            type: Sequelize.STRING,
        },
        expiry_date: {
            type: Sequelize.DATE,
        },
    });
  
    // Additional functions the token model can call on itself.
    RefreshToken.createToken = async function (user) {

        // Could limit the no of refresh tokens here to one, but what if multiple sessions?.
        const expiredAt = new Date();
  
        expiredAt.setSeconds(expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION);
  
        const _token = uuidv4();
  
        const refreshToken = await this.create({
            token: _token,
            user_id: user.id,
            expiry_date: expiredAt.getTime(),
        });
  
        return refreshToken.token;
    };
  
    RefreshToken.isValid = (token) => {
        return token.expiry_date.getTime() > new Date().getTime();
    };
  
    return RefreshToken;
};
  