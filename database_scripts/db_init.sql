-- DROP TABLE IF EXISTS contacts;

CREATE TABLE user (
    user_id SERIAL PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
);


CREATE TABLE subject (
    subject_id SERIAL PRIMARY KEY,
    user_id INT,

    user_id int NOT NULL,
    day int,
    name varchar(255) NOT NULL,
    colour varchar(255),
    start_date varchar(255) NOT NULL,
    end_date varchar(255) NOT NULL,
    description varchar(512),

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFFERENCES user(user_id)
);


CREATE TABLE class (
    class_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,

    day INT,
    type VARCHAR(255),
    location VARCHAR(255),
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFFERENCES user(subject_id)
);


CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    subject_id INT,

    name VARCHAR(255),
    due_datetime VARCHAR(255),
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFFERENCES user(subject_id)
);


CREATE TABLE shortcut_link (
    ID SERIAL,
    name varchar(255),
    url varchar(255),
    userID int NOT NULL
);