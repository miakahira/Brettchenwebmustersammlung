console.log('Script geladen');

//HTML-Elemente
let patternBlocks=document.createElement("div");
patternBlocks.classList.add("container");
patternBlocks.id="patterns";
document.body.appendChild(patternBlocks);

const bildInput = document.getElementById('MusterDatei');
bildInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log('Ausgewählte Datei:', file);
});

const webbriefInput = document.getElementById('WebbriefDatei');
webbriefInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log('Ausgewählte Datei:', file);
});

function patterns() {
    console.log('Patterns werden geladen...');

    fetch('http://localhost:3000/patterns')
        .then(response => response.json())
        .then(data => {
            console.log('Patterns:', data);
            // Hier können Sie die Patterns in Ihrem HTML anzeigen
            for (const pattern of data) {
                const patternElement = document.createElement('div');
                patternElement.classList.add('pattern');

                const name = document.createElement('h3');
                name.textContent = `${pattern.name}`;

                const anzahlBrettchen = document.createElement('p');
                anzahlBrettchen.textContent = `Anzahl Brettchen: ${pattern.anzahl_brettchen}`;

                const typ = document.createElement('p');
                typ.textContent = `Typ: ${pattern.typ}`;

                const design = document.createElement('p');
                design.textContent = `Design: ${pattern.design}`;

                const bildMuster = document.createElement('img');
                bildMuster.src = `http://localhost:3000/Bilder/${pattern.bild_muster}`;
                bildMuster.alt = `Bild für ${pattern.name}`;
                
                const webbrief = document.createElement('img');
                webbrief.src = `http://localhost:3000/Bilder/${pattern.webbrief}`;
                webbrief.alt = `Webbrief für ${pattern.name}`;
                
                patternElement.appendChild(name);
                patternElement.appendChild(anzahlBrettchen);
                patternElement.appendChild(typ);
                patternElement.appendChild(design);
                patternElement.appendChild(bildMuster);
                patternElement.appendChild(webbrief);

                patternBlocks.appendChild(patternElement);
            }

        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Patterns:', error);
        });
}

function savePattern() {
    console.log('Pattern wird gespeichert...', patternData);
    const name = document.getElementById('Name').value;
    const anzahl_brettchen = document.getElementById('anzahlBrettchen').value;

    
    const typ = document.getElementById('Typ').value;
    const design = document.getElementById('Design').value;
    const bild_muster_name = document.getElementById('MusterDatei').files[0]?.name || 'Kein Bild ausgewählt';
    const webbrief_bildName = document.getElementById('WebbriefDatei').files[0]?.name || 'Kein Webbrief ausgewählt';

    // Create FormData object
    const formData = new FormData();
    formData.append('image', document.getElementById('MusterDatei').files[0]); // Image file
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
const patternsButton = document.getElementById('patterns');
patternsButton.addEventListener('click', function(){
    patternsButton.classList.add('inactive');
    patterns();
})

const patternSpeichernButton = document.getElementById('patternSpeichern');
patternSpeichernButton.addEventListener('click', savePattern);
