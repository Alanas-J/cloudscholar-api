
module.exports = async (user) => {
    const user_data = {};

    user_data.subjects = await user.getSubjects(
        {       
            attributes: ['name', 'colour', 'start_date', 'end_date'],   
            include: [{
                association: 'classes',
                attributes: ['day', 'type', 'location', 'start_time', 'end_time','description']
            },
            {
                association: 'tasks',
                attributes: ['name', 'due_datetime', 'description']
            }]
        });

    user_data.shortcut_links = await user.getShortcut_links(
        { 
            attributes: ['name', 'url', 'order_no']
        });

    return user_data;
}