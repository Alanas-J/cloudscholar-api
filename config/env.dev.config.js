module.exports = {
    JWT: {
        KEY: "secret_key",
        EXPIRATION: '1h',
        REFRESH_TOKEN: {
            EXPIRATION: 100000
        } 
    },
        
    DATABASE: {
        HOST: "database-1.cqjsibxccdnt.eu-west-1.rds.amazonaws.com",
        USER: "postgres",
        PASSWORD: "cs-password",
        DB: "postgres",
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};