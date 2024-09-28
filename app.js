// Import required modules
const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const orgdata = require("./models/userorg");

// Create an Express app
const app = express();
const port = 2002; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the 'public' folder
app.use(express.static('public'));

// Basic route to render index.ejs
// Set EJS as the templating engine
app.set('view engine', 'ejs');


// Handle a GET request (for AJAX)
app.get('/data', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});


// Handle a POST request (for AJAX)
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received successfully', data: req.body });
});


//import routes 
const routes = require("./routes/landing route");
const PilgrimRoute = require("./routes/Pilgrim route");
const orgRoute = require("./routes/org route");
const homeOrga = require("./routes/home-org route");
const homepilg = require("./routes/home-pil route");

// use the routes 
app.use(routes);
app.use(PilgrimRoute);
app.use(orgRoute);
app.use(homeOrga);
app.use(homepilg);


// Start the server + database
mongoose.connect("mongodb+srv://ghadeer:0iuDyICJDPAKxGur@cluster0.ifqxq.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
})
.catch((err) => {console.log(err)});

app.post('/', (req, res) => {
   console.log(req.body)
   res.redirect("/homeOrg.html")
})



//const Data = require('./models/data');

////////////////////////////////////////////////////////////////
//s//
// استيراد التوجيهات
const groupRoutes = require('./routes/groupRoutes');
app.use('/', groupRoutes);



