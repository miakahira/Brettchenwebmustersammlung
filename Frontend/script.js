console.log('Script geladen');

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
// Event-Listener für den Button
const askMiaButton = document.getElementById('askMiaButton')
askMiaButton.addEventListener('click', askMia);

const patternsButton = document.getElementById('patterns');
patternsButton.addEventListener('click', patterns);
