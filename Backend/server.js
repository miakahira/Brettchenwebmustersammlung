// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// Patterns-Routen
app.get('/patterns', (req, res) => {
    db.all('SELECT * FROM patterns', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/patterns', (req, res) => {
    const { name, anzahl_brettchen, typ, design, bild_muster, webbrief } = req.body;
    console.log('Empfangene Daten:', req.body);
    console.log('Zu Speicherndes Musterbild:', req.body.image);
    const sql = 'INSERT INTO patterns (name, anzahl_brettchen, typ, design, bild_muster, webbrief) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [name, anzahl_brettchen, typ, design, `Muster/${bild_muster}`, `Webbriefe/${webbrief}`];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.get(`/Bilder/Muster/:filename`, (req, res) => {
    getImage(req, res, 'Muster');
});

app.get(`/Bilder/Webbriefe/:filename`, (req, res) => {   
    getImage(req, res, 'Webbriefe');
});


// Route zum Bereitstellen von Bildern
app.get('/Bilder/:filename', (req, res) => {

    console.log('Anfrage für Bild:', req.params.filename);

    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'Bilder', filename);

    if (fs.existsSync(filePath)) {
        console.log("File exists, sending:", filePath);
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Bild nicht gefunden' });
    }
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


function getImage(req, res, type) {
    console.log('Anfrage für ' + type + 'bild:', req.params.filename);
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'Bilder', type, filename);

    if (fs.existsSync(filePath)) {
        console.log(type + 'bild exists, sending:', filePath);
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: type + 'bild nicht gefunden' });
    }
}

