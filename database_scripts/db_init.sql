DROP TABLE IF EXISTS cloudscholar_class;
DROP TABLE IF EXISTS cloudscholar_task;
DROP TABLE IF EXISTS cloudscholar_shortcut_link;
DROP TABLE IF EXISTS cloudscholar_subject;
DROP TABLE IF EXISTS cloudscholar_user;


CREATE TABLE cloudscholar_user (
    user_id SERIAL PRIMARY KEY,

    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);


CREATE TABLE cloudscholar_subject (
    subject_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,

    day int,
    name VARCHAR(255) NOT NULL,
    colour VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES cloudscholar_user(user_id)
);


CREATE TABLE cloudscholar_class (
    class_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,

    day INT,
    type VARCHAR(255),
    location VARCHAR(255),
    start_time TIME,
    end_time TIME,
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES cloudscholar_subject(subject_id)
);


CREATE TABLE cloudscholar_task (
    task_id SERIAL PRIMARY KEY,
    subject_id INT,

    name VARCHAR(255),
    due_datetime TIMESTAMP,
    description VARCHAR(512),

    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES cloudscholar_subject(subject_id)
);


CREATE TABLE cloudscholar_shortcut_link (
    shortcut_link_id SERIAL PRIMARY KEY,
    user_id INT,

    name VARCHAR(255),
    url VARCHAR(255),
    order INT,

    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES cloudscholar_user(user_id)
);
