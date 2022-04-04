const db = require("../models");
const getUserData = require("./logic/user_to_userdata")
const overrideUserData = require("./logic/override_userdata")
const User = db.users;

exports.get = async (req, res, next) => {

    try {
        const user = await User.findByPk(req.userJWT.userId);

        if(!user){
            return res.status(404).json({
                message: `User with id=${req.userJWT.userId} not found.`
            });
        }

        res.status(200).json(await getUserData(user));

    } catch (error) {
        res.status(500).json({
            message: "Internal server error fetching userid=" + req.userJWT.userId,
            error: error
        });

    }
};

exports.update = async (req, res, next) => {

    let user; 
    let transaction;

    try {
        user = await User.findByPk(req.userJWT.userId);
        if(!user)
            return res.status(404).json({
                message: "User not found in DB."});

        transaction = await db.sequelize.transaction();

    } catch (error) {
        console.log(error);
        res.status(500).json({
                message: "Failure to initialise update.",
                error: error
            });
    }


    try {
        const user_data = await overrideUserData(db, user, req.body);

        await transaction.commit();

        res.status(200).json({
                message: "Sucessful update!",
                user_data: user_data
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failure to complete update, rolling back.",
            error: error
        });
    
        await transaction.rollback();
    }

};