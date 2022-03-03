const db = require("../models");
const User = db.users;
const Subjects = db.subjects;
const Tasks = db.tasks;
const Classes = db.classes;
const ShortcutLinks= db.shortcut_links;

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

    console.log(req.params.id);

    // Nested async to ensure rollback failure is caught.
    const asyncOp = async () => {
        const t = await sequelize.transaction();
        try {
            const user = await User.findByPk(req.params.id);

            const subjects = await user.getSubjects()
            for(subj in subjects){
                await subj.removeClasses()
                await subj.removeTasks()
            }
                                       
            await user.removeShortcut_links()

            // I'll need to manually create and set new entries ontop



            await t.commit();
        } catch (error) {
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
            //console.log(data);
            data.getSubjects()
                .then(data2 => {

                    data2.forEach(element => {
                        element.getClasses()
                            .then(out => console.log(out))    
                    });

                });

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred during creation."
            });
        });
    
}