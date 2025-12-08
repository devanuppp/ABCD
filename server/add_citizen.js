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
    console.log('Connected to the SQLite database.');
});

const citizen = {
    name: 'Nurbu Sherpa',
    idNumber: '1011-1011',
    gender: 'Male',
    dob: '2003-04-13',
    dobBS: '2060-01-01', // Based on calculation or user input requirement
    idFrontPath: 'nurbu_front.jpg',
    idBackPath: 'nurbu_back.jpg',
    status: 'verified' // Auto-verify administrative additions
};

const sql = `INSERT INTO citizens (name, idNumber, gender, dob, dobBS, idFrontPath, idBackPath, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
const params = [citizen.name, citizen.idNumber, citizen.gender, citizen.dob, citizen.dobBS, citizen.idFrontPath, citizen.idBackPath, citizen.status];

db.serialize(() => {
    // Ensure column exists (handling race condition with db.js startup)
    db.run("ALTER TABLE citizens ADD COLUMN name TEXT", (err) => {
        // Only log real errors, ignore "duplicate column name"
        if (err && !err.message.includes("duplicate column name")) {
            console.log("Migration note:", err.message);
        }
    });

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error inserting citizen:", err.message);
        } else {
            console.log(`Citizen added with ID: ${this.lastID}`);
            console.log(`Name: ${citizen.name} (Credentials)`);
            console.log(`ID Number: ${citizen.idNumber}`);
        }
    });
});

db.close();
