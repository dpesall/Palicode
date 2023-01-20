const path = require('path');
const express = require("express");
const fs = require('fs');
const nthline = require('nthline');

const PORT = process.env.PORT || 3001;

const app = express();

const fileRoot = 'server-resources/';
const maxLines = 25;

let firstWord = false;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/retrieve-word", (req, res) => {
    if(firstWord) {
        res.json({ message: 'palicode' });
        firstWord = false;
    } else {
        try {
            let lineIndex = Math.floor(Math.random() * maxLines);
            nthline(lineIndex, fileRoot + 'words.txt').then(line => res.json({ message: line }));
        } catch(e) {
            console.log('Error:', e.stack);
            res.json({message: 'error'});
        }
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});