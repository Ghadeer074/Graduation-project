// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// Create an Express app
const app = express();
const port = 2002; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));

// Serve static files (CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Basic route to render index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Handle a GET request (for AJAX)
app.get('/data', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Handle a POST request (for AJAX)
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received successfully', data: req.body });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const name = req.query.name || 'Guest'; // Defaults to 'Guest' if no name is provided
    res.render('index', { name });
});


// Start the server + database
mongoose.connect("mongodb+srv://ghadeer:0iuDyICJDPAKxGur@cluster0.ifqxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
})
.catch((err) => {console.log(err)});
//const Data = require('./models/data');

//app.post('/api/data', (req, res) => {
   // const newData = new Data(req.body);

    //newData.save()
  //      .then(result => res.json(result))
      //  .catch(err => res.status(400).json('Error: ' + err));
//});

//// Routes
//app.get('/', (req, res) => {
  //  res.send('Welcome to the App!');
//  ^});

