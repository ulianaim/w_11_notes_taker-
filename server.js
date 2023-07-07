const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const db = require('./Develop/db/db.json')
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Develop/public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);

app.get('/api/notes', (req, res) =>{
    fs.readFile('Develop/db/db.json', 'utf8', (error, data) => {
    if (error) throw error;
    res.json(JSON.parse(data))
    })
});

app.post('/api/notes', (req, res) =>{
    db.push (req.body)
    fs.writeFile('Develop/db/db.json', JSON.stringify(db), 'utf8', (error, data) => {
    if (error) throw error;
    res.json(data)
    })
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);