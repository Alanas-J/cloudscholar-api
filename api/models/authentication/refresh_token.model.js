const { v4: uuidv4 } = require("uuid");
const env = require(`../../../config/env.${process.env.NODE_ENV}.config`);

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refresh_token", {
        token: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        expiry_date: {
            type: Sequelize.DATE,
        },
    });
  
    RefreshToken.createToken = async function (user) {

        const expiredAt = new Date();
  
        expiredAt.setSeconds(expiredAt.getSeconds() + env.JWT.REFRESH_TOKEN.EXPIRATION);
  
        const _token = uuidv4();
  
        const refreshToken = await this.create({
            token: _token,
            user_id: user.id,
            expiry_date: expiredAt.getTime(),
        });
  
        return refreshToken.token;
    };
  
    RefreshToken.isValid = (token) => {
        const date = new Date();

        console.log(token.expiry_date.getTime());
        console.log(date.getTime());
        return token.expiry_date.getTime() > date.getTime();
    };
  
    return RefreshToken;
};
  