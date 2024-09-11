// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create an Express app
const app = express();
const port = 3000; 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));

// Basic route to render index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const Data = require('./models/data');

app.post('/api/data', (req, res) => {
    const newData = new Data(req.body);

    newData.save()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

