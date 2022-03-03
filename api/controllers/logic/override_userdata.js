const getUserData = require("./user_to_userdata")

module.exports = async (db, user, user_data) => {

    await db.subjects.destroy({where: {user_id: user.id}});
    
    if(user_data.subjects){
        for(let i = 0; i < user_data.subjects.length; i++){
            await user.createSubject(
                user_data.subjects[i],
                { include: ["classes", "tasks"]});
        }
    }


    await db.shortcut_links.destroy({where: {user_id: user.id}});
    
    if(user_data.shortcut_links){
        for(let i = 0; i < user_data.shortcut_links.length; i++){
            await user.createShortcut_link(user_data.shortcut_links[i]);
        }
    }

    return getUserData(user);
}
