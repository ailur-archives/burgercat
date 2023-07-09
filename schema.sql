DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS sessions;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    banned TEXT NOT NULL DEFAULT 0,
    administrator INTEGER NOT NULL DEFAULT 0,
    htmldescription TEXT NOT NULL
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT NOT NULL,
    creator TEXT NOT NULL,
    imageurl TEXT NOT NULL,
    textstr TEXT NOT NULL
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    created TEXT NOT NULL,
    creator TEXT NOT NULL,
    textstr TEXT NOT NULL
);

CREATE TABLE sessions (
    session TEXT PRIMARY KEY NOT NULL,
    id INTEGER NOT NULL
);