const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, "bhargav.db");
const connectionDB = async () =>{

   const db = await open({
        filename:dbPath,
        driver: sqlite3.Database


    });
    const primaryKEy = await db.exec (`
        create table if not exists players(
        id integer primary key autoincrement,
        player_name TEXT,
        number INTEGER,
        age INTEGER,
        qualification TEXT
        
        )
        
        `);
    return db;
};
module.exports = connectionDB;