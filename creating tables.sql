CREATE TABLE userBase (
    user_ID integer PRIMARY KEY AUTO_INCREMENT, 
    email VARCHAR(255) NOT NULL, 
    username VARCHAR(32) NOT NULL, 
    password BINARY(64) NOT NULL, 
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW()
)

CREATE TABLE posts (
    post_ID integer PRIMARY KEY AUTO_INCREMENT, 
    author_ID integer NOT NULL, 
    image MEDIUMBLOB, 
    description TEXT(160), 
    liked_ID integer NOT NULL, 
    comments_ID integer NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (author_ID) REFERENCES userBase(user_ID),
    FOREIGN KEY (liked_ID) REFERENCES likes(liked_ID), 
    FOREIGN KEY (comments_ID) REFERENCES comments(comments_ID)
)

CREATE TABLE comments (
    comments_ID PRIMARY KEY integer NOT NULL, 
    author_ID integer NOT NULL, 
    content TEXT(160),
    liked_ID integer NOT NULL, 
    post_ID integer, 
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (author_ID) REFERENCES userBase(user_ID), 
    FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
)

CREATE TABLE likes (
    liked_ID PRIMARY KEY integer NOT NULL, 
    author_ID integer NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW(), 
    FOREIGN KEY (author_ID) REFERENCES userBase(user_ID)
)


CREATE TABLE friends (
    friend_ID PRIMARY KEY integer NOT NULL, 
    profile_ID integer NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW(), 
    FOREIGN KEY (profile_ID) REFERENCES userBase(user_ID)
)