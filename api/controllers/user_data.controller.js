const db = require("../models");
const User = db.users;
const Subject = db.subjects;
const Task = db.subjects;
const ShortcutLink = db.shortcut_links;


exports.getById = (req, res, next) => {

    console.log(req.params.id);

    User.findByPk(req.params.id, { include: [
            {
                association: "subjects",
                include: ["classes", "tasks"]
            },
            {
                association: "shortcut_links"
            }]
        })
        .then(data => {

            console.log(data);

            if (data) {
                console.log(data);
                res.send(data);
            } else {
            res.status(404).send({
                message: `Cannot find Tutorial with id=${req.params.id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Tutorial with id=" + req.params.id
            });
        });

};


exports.updateById = async (req, res, next) => {

    // Nested async to ensure rollback failure is caught.
    const asyncOp = async () => {

        const user = await User.findByPk(req.params.id);
        if(!user)
            return res.status(400).json({
                error: "User not found in DB."
              });
        const t = await db.sequelize.transaction();

        try {
            // 1. Old Entity Deletion (Using Cascading implicitly on nested records.)
            await Subject.destroy({where: {user_id: user.id}});
            await Task.destroy({where: {user_id: user.id}});
            await ShortcutLink.destroy({where: {user_id: user.id}});
        
            // 2. Entity Recreation
            if(req.body.subjects){
                for(let i = 0; i < req.body.subjects.length; i++){
                    await user.createSubject(
                        req.body.subjects[i],
                        { include: ["classes", "tasks"]});
                }
            }
            if(req.body.shortcut_links){
                for(let i = 0; i < req.body.shortcut_links.length; i++){
                    await user.createTask(req.body.shortcut_links[i]);
                }
            }

            await t.commit();
            res.status(200).json(user);
            
        } catch (err) {
            await t.rollback();

            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    };

    asyncOp()
        .catch( (err) => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });

};


// Temporary test mapping
exports.createUserData = (req, res, next) => {

    User.create(
        {
            email: "asassdfg@gmail.com",
            password: "password",
            subjects: [
                {
                    name: 'Test subject 1',
                    colour: '#111111',
                    classes: [{
                        day: 1,
                        type: "Lab",
                        location:"CQ-1112"
                    }]
                },
                {
                    name: 'Test subject 2',
                    colour: '#222222'
                }
            ],
            shortcut_links: [
                {name: "asadfsfad",
                url: "afsdfsa"}
            ]
        }, 
        { 
            include: [
            {
                association: "subjects",
                include: ["classes", "tasks"]
            },
            {
                association: "shortcut_links"
            }]
        })
        .then(data => { 
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred during creation."
            });
        });
    
}