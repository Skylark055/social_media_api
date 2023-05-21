import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    const userBase = `CREATE TABLE userBase (id integer PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) NOT NULL, 
               username VARCHAR(32) NOT NULL, password BINARY(64) NOT NULL, first_name VARCHAR(255) NOT NULL, 
               last_name VARCHAR(255) NOT NULL, created TIMESTAMP NOT NULL DEFAULT NOW()`;
    
    con.query(userBase, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    const posts = `CREATE TABLE posts (id integer PRIMARY KEY AUTO_INCREMENT, author_ID integer NOT NULL, 
                               image MEDIUMBLOB, PATH_TO_CONTENT, description TEXT(160) NOT NULL, likes_ID integer NOT NULL, 
                               comments_ID integer NOT NULL, created TIMESTAMP NOT NULL DEFAULT NOW())`;
    con.query(posts, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    
    const comments = "CREATE TABLE comments (id integer PRIMARY KEY AUTO_INCREMENT, comments)";
    con.query(comments, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });

    const likes = "CREATE TABLE likes (id integer PRIMARY KEY AUTO_INCREMENT, )";
    con.query(likes, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    
    const friends = "CREATE TABLE friends (id integer PRIMARY KEY AUTO_INCREMENT, )";
    con.query(friends, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

