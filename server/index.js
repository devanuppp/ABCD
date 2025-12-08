
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files (uploaded images)
app.use('/uploads', express.static(uploadsDir));

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/register', upload.fields([{ name: 'idFront', maxCount: 1 }, { name: 'idBack', maxCount: 1 }]), (req, res) => {
    try {
        const { idNumber, dob, dobBS } = req.body;
        const idFrontPath = req.files['idFront'] ? req.files['idFront'][0].filename : null;
        const idBackPath = req.files['idBack'] ? req.files['idBack'][0].filename : null;

        if (!idFrontPath || !idBackPath) {
            return res.status(400).json({ error: "Both ID images are required" });
        }

        const sql = `INSERT INTO citizens (idNumber, dob, dobBS, idFrontPath, idBackPath) VALUES (?, ?, ?, ?, ?)`;
        const params = [idNumber, dob, dobBS, idFrontPath, idBackPath];

        db.run(sql, params, function (err) {
            if (err) {
                console.error("DB Error", err);
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: "Registration successful",
                data: {
                    id: this.lastID,
                    idNumber,
                    dob
                }
            });
        });
    } catch (error) {
        console.error("Server Error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
