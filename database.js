const Database = require('better-sqlite3');
//connect to database or create a new one
const db = new Database('log.db');

//start checking if database is initialized
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
//define row with better sqlite get()
let row = stmt.get();

// init db
if (row === undefined) {
    console.log('Log database is empty. Creating log database...')

    const sqlInit = `
        CREATE TABLE accesslog ( id INTEGER NOT NULL PRIMARY KEY, 
            remoteaddr TEXT, remoteuser TEXT, time INTEGER, 
            method TEXT, url TEXT, protocol TEXT, 
            httpversion TEXT, status INTEGER, 
            referer TEXT, useragent TEXT);
    `;

    db.exec(sqlInit)
} else {
    console.log("Database exists");
}

module.exports = db;