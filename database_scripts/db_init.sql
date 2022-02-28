CREATE TABLE user (
    ID int,
    email varchar(255),
    password varchar(255)
);

CREATE TABLE subject (
    ID SERIAL PRIMARY KEY,
    day int,
    name varchar(255),
    colour varchar(255),
    start_date varchar(255),
    end_date varchar(255),
    description varchar(512),
    userID int
);

CREATE TABLE class (
    ID int,
    day int,
    type varchar(255),
    location varchar(255),
    start_time, varchar(255),
    end_time varchar(255),
    description varchar(512),
    subjectID int
);

CREATE TABLE task (
    ID int,
    name varchar(255),
    due_datetime varchar(255),
    description varchar(512),
    subjectID int
);

CREATE TABLE shortcut_link (
    ID int,
    name varchar(255),
    url varchar(255),
    userID int
);






    - Subject Table: name, colour hex, start and end date. userID
        
        - Class: day, type, location, start time, end time, description. subjectFK

        - Task: due_datetime, name, description, subjectFK(0-1)

    - shortcut_links: display_order, shortcut name, shortcut_url, userID


 