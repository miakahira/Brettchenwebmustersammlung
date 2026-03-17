console.log('Script geladen');

const imageInput = document.getElementById('fileInput');
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log('Ausgewählte Datei:', file);
});

// Funktion, um Mia zu fragen
function askMia() {
    console.log('Mia wird gefragt...');

    fetch('http://localhost:3000/mia')
        .then(response => response.json())
        .then(data => {
            console.log('Antwort von Mia:', data);
            alert(data.message); // Zeigt die Antwort in einem Alert an
        })
        .catch(error => {
            console.error('Fehler beim Abrufen von Mia:', error);
        });
}

function patterns() {
    console.log('Patterns werden geladen...');

    fetch('http://localhost:3000/patterns')
        .then(response => response.json())
        .then(data => {
            console.log('Patterns:', data);
            // Hier können Sie die Patterns in Ihrem HTML anzeigen
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Patterns:', error);
        });
}

function savePattern() {
    console.log('Pattern wird gespeichert...', patternData);
    const name = document.getElementById('patternInput').value;
    const anzahl_brettchen = document.getElementById('anzahlBrettchen').value;
    const typ = 'Beispieltyp';  
    const design = 'Beispieldesign';
    const bild_muster_name = document.getElementById('fileInput').files[0]?.name || 'Kein Bild ausgewählt';
    const webbrief_bildName = 'Beispielwebbrief';

    // Create FormData object
    const formData = new FormData();
    formData.append('image', document.getElementById('fileInput').files[0]); // Image file
    formData.append('data', JSON.stringify({ name,anzahl_brettchen,typ,design,bild_muster: bild_muster_name,webbrief: webbrief_bildName})); // JSON data as string

    fetch('http://localhost:3000/patterns', {
        method: 'POST',
        headers: {      'Content-Type': 'application/json'    },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pattern gespeichert:', data);
        alert('Pattern erfolgreich gespeichert! ID: ' + data.id);
    })
    .catch(error => {
        console.error('Fehler beim Speichern des Patterns:', error);
        alert('Fehler beim Speichern des Patterns');
    });
        
}
// Event-Listener für den Button
const askMiaButton = document.getElementById('askMiaButton')
askMiaButton.addEventListener('click', askMia);

const patternsButton = document.getElementById('patterns');
patternsButton.addEventListener('click', patterns);

const patternSpeichernButton = document.getElementById('patternSpeichern');
patternSpeichernButton.addEventListener('click', savePattern);
