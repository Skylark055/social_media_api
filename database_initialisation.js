import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    const userBase = `CREATE TABLE userBase (
      user_ID integer PRIMARY KEY AUTO_INCREMENT, 
      email VARCHAR(255) NOT NULL, 
      username VARCHAR(32) NOT NULL, 
      password BINARY(64) NOT NULL, 
      first_name VARCHAR(255) NOT NULL, 
      last_name VARCHAR(255) NOT NULL, 
      created TIMESTAMP NOT NULL DEFAULT NOW()
  )`;
    
    con.query(userBase, function (err, result) {
      if (err) throw err;
      console.log("Table userBase created");
    });

    const posts = `CREATE TABLE posts (
      post_ID integer PRIMARY KEY AUTO_INCREMENT, 
      author_ID integer NOT NULL, 
      image MEDIUMBLOB, 
      description TEXT(160), 
      tot_likes integer NOT NULL, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID)
  )`;
  con.query(posts, function (err, result) {
      if (err) throw err;
      console.log("Table posts created");
    });

    const likes = `CREATE TABLE likes (
      like_ID integer PRIMARY KEY AUTO_INCREMENT,
      post_ID integer NOT NULL,
      author_ID integer NOT NULL, 
      created TIMESTAMP NOT NULL DEFAULT NOW(), 
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID),
      FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
  )`;

    con.query(likes, function (err, result) {
        if (err) throw err;
        console.log("Table likes created");
      });
    
    const comments = `CREATE TABLE comments (
      comments_ID integer PRIMARY KEY AUTO_INCREMENT, 
      author_ID integer NOT NULL, 
      content TEXT(160) NOT NULL, 
      post_ID integer NOT NULL, 
      reply_to_ID integer,
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (author_ID) REFERENCES userBase(user_ID), 
      FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
  )`;

    con.query(comments, function (err, result) {
        if (err) throw err;
        console.log("Table comments created");
      });
    
    const friends = `CREATE TABLE friends (
      ID integer PRIMARY KEY,
      friend_ID integer, 
      profile_ID integer, 
      created TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT fk_friend_ID FOREIGN KEY (friend_ID) REFERENCES userBase(user_ID),
      CONSTRAINT fk_profile_ID FOREIGN KEY (profile_ID) REFERENCES userBase(user_ID)
  )`;
    con.query(friends, function (err, result) {
        if (err) throw err;
        console.log("Table friends created");
    });
    console.log("Completed the set up")
});

System.exit(0)