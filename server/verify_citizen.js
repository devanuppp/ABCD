import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'voting.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        process.exit(1);
    }
});

db.all('SELECT * FROM citizens WHERE idNumber = "1011-1011"', (err, rows) => {
    if (err) {
        console.error("Query Error", err);
    } else {
        console.log("Verification Result:");
        console.log(rows);
    }
    db.close();
});
