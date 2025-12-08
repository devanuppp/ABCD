
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'voting.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected.');
});

db.serialize(() => {
    db.run("DELETE FROM citizens WHERE idNumber = '1011-1011'", function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Deleted ${this.changes} rows.`);
        }
    });
    db.close();
});
