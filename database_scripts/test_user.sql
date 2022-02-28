-- bob@mail.com
-- password

-- Does 2 subjects
-- Will make 2 copies of classses for every day.

-- Will have 3 Tasks due for the end of march.

-- one shortcut url to brightspace for the moment.


-- Adding the sole test user for now.
insert into cloudscholar_user (email, password) values ('bob@mail.com', 'password');

-- Adding the subjects
insert into cloudscholar_subject (user_id, name, colour, start_date, end_date) 
    values ((select user_id from cloudscholar_user where email='bob@mail.com'),
    'Fourth Year P Testing', '#550055', '2022-1-1', '2022-6-1');
insert into cloudscholar_subject (user_id, name, colour, start_date, end_date) 
    values ((select user_id from cloudscholar_user where email='bob@mail.com'),
    'Fourth Year P Testing 2', '#005555', '2022-1-1', '2022-6-1');

-- Adding Classes
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing'),
    1, 'Lecture', 'C-123', '12:00', '14:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing'),
    2, 'Lecture', 'C-123', '12:00', '14:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing'),
    3, 'Lecture', 'C-123', '12:00', '14:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing'),
    4, 'Lecture', 'C-123', '12:00', '14:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing'),
    5, 'Lecture', 'C-123', '12:00', '14:00', 'Additional info...');


-- Adding Classes
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    1, 'Lecture', 'C-123', '14:00', '16:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    2, 'Lecture', 'C-123', '14:00', '16:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    3, 'Lecture', 'C-123', '14:00', '16:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    4, 'Lecture', 'C-123', '14:00', '16:00', 'Additional info...');
insert into cloudscholar_class (subject_id, day, type, location, start_time, end_time, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    5, 'Lecture', 'C-123', '14:00', '16:00', 'Additional info...');


-- Adding 3 tasks due for the end of march
insert into cloudscholar_task (subject_id, name, due_datetime, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    'Assignment 1', '2022-03-31 23:59:00', 'Additional info...');
insert into cloudscholar_task (subject_id, name, due_datetime, description)
    values ((select subject_id from cloudscholar_subject where name='Fourth Year P Testing 2'),
    'Final Lab', '2022-03-29 23:59:00', 'Additional info...'); 


-- Adding one shortcut url.
insert into cloudscholar_shortcut_link (user_id, name, url)
    values ((select user_id from cloudscholar_user where email='bob@mail.com'),
    'Brightspace', 'brightspace.tudublin.ie');