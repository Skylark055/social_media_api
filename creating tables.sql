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
      tot_likes integer NOT NULL, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID)
  )

CREATE TABLE likes (
      like_ID integer PRIMARY KEY AUTO_INCREMENT,
      post_ID integer NOT NULL,
      author_ID integer NOT NULL, 
      created TIMESTAMP NOT NULL DEFAULT NOW(), 
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID),
      FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
  )

CREATE TABLE comments (
      comments_ID integer PRIMARY KEY AUTO_INCREMENT, 
      author_ID integer, 
      content TEXT(160), 
      post_ID integer, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID), 
      FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
  )


CREATE TABLE friends (
      ID integer PRIMARY KEY,
      friend_ID integer, 
      profile_ID integer, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT fk_friend_ID FOREIGN KEY (friend_ID) REFERENCES userBase(user_ID),
      CONSTRAINT fk_profile_ID FOREIGN KEY (profile_ID) REFERENCES userBase(user_ID)
  )