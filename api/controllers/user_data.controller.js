const db = require("../models");
const User = db.users;


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
        const t = await db.sequelize.transaction();

        try {
            const user = await User.findByPk(req.params.id);

            // 1. Old Record Deletion
            const subjects = await user.getSubjects();
            console.log(subjects);
            for(const subject in subjects){

                console.log("subj value: " );
                console.log(subject);
                
                //await subject.setTasks([]);
                //await subject.setClasses([]);
            }
                                       
            await user.setShortcut_links([]);

            
            // 2. Entity Recreation
            for(subj in req.body.subjects){

                await User.createSubject(
                    subj,
                    { include: ["classes", "tasks"]});
            }

            for(shortcut in req.body.shortcut_links){
                await User.createShortcut_link(shortcut);
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