// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// CORS aktivieren
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SQLite-Datenbankverbindung
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// Tabelle erstellen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS patterns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        anzahl_brettchen INTEGER NOT NULL,
        typ TEXT NOT NULL,
        design TEXT NOT NULL,
        bild_muster TEXT NOT NULL,
        webbrief TEXT NOT NULL
    );`);
});

// Beispielroute (GET)
app.get('/patterns', (req, res) => {
    db.all('SELECT * FROM patterns', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Beispielroute (GET)
app.get('/mia', (req, res) => {
    console.log('Mia wurde angefragt');
    res.json({ message: 'Hallo Mia! Wie geht es dir?' });
});


// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
