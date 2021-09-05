//Sqlite Module
const sqlite3 = require('sqlite3').verbose();

//connect to sqlite database
let db = new sqlite3.Database('./db/ocs_athletes.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the acs_athletes database.');
  });

//export module
  module.exports = db;