
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'voting.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS citizens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idNumber TEXT,
            gender TEXT,
            dob TEXT,
            dobBS TEXT,
            idFrontPath TEXT,
            idBackPath TEXT,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err);
            } else {
                // Migration for existing table
                db.run("ALTER TABLE citizens ADD COLUMN gender TEXT", (err) => {
                    // Ignore error if column exists
                });
            }
        });
    }
});

export default db;
