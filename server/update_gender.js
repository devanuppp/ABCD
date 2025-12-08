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

db.run("UPDATE citizens SET gender = 'Male' WHERE idNumber = '1011-1011'", function (err) {
    if (err) {
        console.error("Error updating gender:", err.message);
    } else {
        console.log(`Updated gender for Nurbu Sherpa. Rows affected: ${this.changes}`);
    }
    db.close();
});
