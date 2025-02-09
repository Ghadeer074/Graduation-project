// Import required modules
const express = require('express');
const http = require('http');


// Create an Express app
const app = express();
const port = 2002; 


require('dotenv').config();
//const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Organizer = require("./models/userorg");
const Pilgrim = require("./models/userpil");
const Chat = require('./models/chat');
const flights = require('./routes/flightsRoute');
const bodyParser = require('body-parser'); ///

//socket
const socketIo = require('socket.io');
const server = http.createServer(app); // إنشاء خادم HTTP باستخدام Express
const io = socketIo(server);

const session = require('express-session');


/*app.use(session({
    secret: 'your-secret-key', // يجب تغييره إلى قيمة سرية حقيقية
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // يجب أن يكون true إذا كنت تستخدم HTTPS
}));*/

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // تأكد من أنك تستخدم HTTPS إذا كانت `cookie.secure` true
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiKey = process.env.TRANSLATOR_API_KEY;
const apiRegion = process.env.TRANSLATOR_REGION;

// Translation route (server-side)
app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    try {
        const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': apiRegion,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ Text: text }]),
        });

        const data = await response.json();
        const translatedText = data[0]?.translations[0]?.text || text;
        res.json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});


// Serve static files from the 'public' folder
app.use(express.static('public'));

// Basic route to render index.ejs
// Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use('/flights',flights);

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
const routes = require("./routes/landing-route");
const PilgrimRoute = require("./routes/pilgrim-route");
const orgRoute = require("./routes/org-route");
const homeOrga = require("./routes/homeorg-route");
const homepilg = require("./routes/homepil-route");
const loginOrganizer = require('./routes/loginOrganizer');
const loginPilgrim = require('./routes/loginPilgrim');
const group = require('./routes/groupRoutes');
const pilgrim = require('./routes/pilgrims');



const hujjguide = require('./routes/hajjGuideRoute');

// use the routes 
app.use(routes);
app.use("/signup-pilgrim",PilgrimRoute);
app.use("/signup-organizer",orgRoute);
app.use(homeOrga);
app.use(homepilg);
app.use(loginPilgrim); 
app.use(loginOrganizer);
app.use(group);
app.use('/hujjGuide',hujjguide);
app.use('/pilgrims',pilgrim);


// Start the server + database
mongoose.connect("mongodb+srv://ghadeer:0iuDyICJDPAKxGur@cluster0.ifqxq.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    { w: "majority" }
});
})

server.listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://localhost:${port}`);
});


// post request for database (org account info)
app.post('/signup-organizer', (req, res) => {
    const organizer = new Organizer(req.body);
    organizer.save()
        .then(() => {
            console.log('Redirecting to login-organizer');  // Add this log
            res.redirect("/login-organizer");
        })
        .catch((err) => {
            console.log('Error:', err);
            res.send("An error occurred while saving the data");
        });
});

// post request for database (pil account info)
app.post('/signup-pilgrim', (req, res) => {
    const pilgrim = new Pilgrim(req.body);
    pilgrim.save()
        .then(() => {
            console.log('Redirecting to login-pilgrim');  // Add this log
            res.redirect("/login-pilgrim");
        })
        .catch((err) => {
            console.log('Error:', err);
            res.send("An error occurred while saving the data");
        });
});



// delete flights data/info 
app.get('/navbar-test', (req, res) => {
    res.render('navbar-test');
});



// Display pilgrim information on their homepage
app.get('/homePilg', (req, res) => {
    Pilgrim.findOne({ username: req.session.pilgrimUsername }) // Fetch based on the current session's user
        .then((pilgrim) => {
            if (!pilgrim) {
                return res.status(404).send('Pilgrim not found');
            }
            // Render the view with pilgrim data
            res.render('homePilg', { pilgrim });
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send('Server error');
        });
});



app.get('/homePilg', (req, res) => {
    Pilgrim.findOne({ username: req.session.pilgrimUsername })
        .then((pilgrim) => {
            if (!pilgrim) {
                return res.status(404).send('Pilgrim not found');
            }
            // Fetch flight data associated with the pilgrim
            Flight.findOne({ pilgrimId: pilgrim._id }) // Assuming pilgrimId is used to associate flights
                .then((flight) => {
                    res.render('homePilg', { pilgrim, flight });
                })
                .catch((err) => {
                    console.error('Flight fetch error:', err);
                    res.status(500).send('Error fetching flight data');
                });
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send('Server error');
        });
});


app.get('/homeOrg', (req, res) => {
    const organizationNumber = req.query.organizationNumber;  // Get the organization number from the query string

    if (!organizationNumber) {
        return res.status(400).send('No organization number provided');
    }

    Organizer.findOne({ OrganizationNumber: organizationNumber }) // Fetch the organizer based on the organization number
        .then((organizer) => {
            if (!organizer) {
                return res.status(404).send('Organizer not found');
            }

            // Render the view with organizer data
            res.render('homeOrg', { organizer });
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send('Server error');
        });
});





// send and receive message in chat **********************************
const users = {};  // تخزين socket بناءً على userId أو username
let connectedPilgrims = []; // قائمة الحجاج المتصلين

// إدارة اتصالات Socket.io
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('login', (userData) => {
        users[userData.userId] = socket.id;  // تخزين socket.id للمستخدم
        console.log(`User ${userData.username} connected with socket id: ${socket.id}`);
        
        //      إضافته الحاج إلى قائمة الحجاج المتصلين
        if (userData.role === 'pilgrim') {
            connectedPilgrims.push({ name: userData.username, socketId: socket.id });
            io.emit('updatePilgrimList', connectedPilgrims); // تحديث القائمة للجميع
        }
    });

    // **استقبال الرسائل   (منظم أو حاج)**
    socket.on('sendMessage', async (data) => {
        try {
            // حفظ الرسالة في قاعدة البيانات
            const newMessage = new Chat({
                senderId: data.senderId,
                receiverId: data.receiverId,
                message: data.message,
                timestamp: Date.now()
            });

            await newMessage.save();  // حفظ الرسالة

            // إرسال الرسالة 
            const targetSocketId = users[data.receiverId];
            if (targetSocketId) {
                io.to(targetSocketId).emit('receiveMessage', {
                    senderId: data.senderId,
                    message: data.message
                });
                console.log(`Message sent from ${data.senderId} to ${data.receiverId}`);
            } else {
                console.log(`User ${data.receiverId} is not connected`);
            }
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    // **عند انقطاع الاتصال**
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);

        // إزالة المستخدم من قائمة الحجاج إذا كان حاجًا
        connectedPilgrims = connectedPilgrims.filter(p => p.socketId !== socket.id);
        io.emit('updatePilgrimList', connectedPilgrims); // تحديث القائمة

        // إزالة المستخدم من قائمة المستخدمين المتصلين
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
});



////////////////////////////////////////////////////////////////
//s//
// استيراد التوجيهات
//const groupRoutes = require('./routes/groupRoutes');
const { parseArgs } = require('util');
//app.use('/', groupRoutes);
