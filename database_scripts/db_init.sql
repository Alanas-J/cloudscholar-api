-- Is used to comment
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS shortcut_link;


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
    name VARCHAR(255) NOT NULL,
    colour VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description VARCHAR(512),

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFFERENCES user(user_id)
);


CREATE TABLE class (
    class_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,

    day INT,
    type VARCHAR(255),
    location VARCHAR(255),
    start_time TIME,
    end_time TIME,
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFFERENCES user(subject_id)
);


CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    subject_id INT,

    name VARCHAR(255),
    due_datetime TIMESTAMP,
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFFERENCES user(subject_id)
);


CREATE TABLE shortcut_link (
    shortcut_link_id SERIAL PRIMARY KEY,
    user_id INT,

    name VARCHAR(255),
    url VARCHAR(255),

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFFERENCES user(user_id)
);