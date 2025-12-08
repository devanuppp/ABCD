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
    idNumber: '1011-1011',
    dob: '2001-01-01',
    dobBS: '2057-09-17', // Based on calculation or user input requirement
    idFrontPath: 'nurbu_front.jpg',
    idBackPath: 'nurbu_back.jpg',
    status: 'verified' // Auto-verify administrative additions
};

const sql = `INSERT INTO citizens (idNumber, dob, dobBS, idFrontPath, idBackPath, status) VALUES (?, ?, ?, ?, ?, ?)`;
const params = [citizen.idNumber, citizen.dob, citizen.dobBS, citizen.idFrontPath, citizen.idBackPath, citizen.status];

db.run(sql, params, function (err) {
    if (err) {
        console.error("Error inserting citizen:", err.message);
    } else {
        console.log(`Citizen added with ID: ${this.lastID}`);
        console.log(`Name: Nurbu Sherpa (Credentials)`);
        console.log(`ID Number: ${citizen.idNumber}`);
    }
    db.close();
});
