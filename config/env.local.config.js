module.exports = {
    JWT: {
        KEY: "secret_key",
        EXPIRATION: '1h',
        REFRESH_TOKEN: {
            EXPIRATION: 100000
        } 
    },
        
    DATABASE: {
        DB: "postgres",
        USER: "postgres",
        PASSWORD: "PASSWORD",
        CONNECTION_CONFIG: {
            host: "localhost",
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }   
    }
};