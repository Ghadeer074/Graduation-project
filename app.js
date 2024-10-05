// Import required modules
const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const  Organizer = require("./models/userorg");
const  Pilgrim = require("./models/userpil");
const Chat = require('./models/chat');

//socket
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app); // إنشاء خادم HTTP باستخدام Express
const io = socketIo(server);


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
app.set('views', path.join(__dirname, 'views')); 
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
const routes = require("./routes/landing-route");
const PilgrimRoute = require("./routes/pilgrim-route");
const orgRoute = require("./routes/org-route");
const homeOrga = require("./routes/homeorg-route");
const homepilg = require("./routes/homepil-route");

// use the routes 
app.use(routes);
app.use("/signup-pilgrim",PilgrimRoute);
app.use("/signup-organizer",orgRoute);
app.use(homeOrga);
app.use(homepilg);


// Start the server + database
mongoose.connect("mongodb+srv://ghadeer:0iuDyICJDPAKxGur@cluster0.ifqxq.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
})
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).catch((err) => {
console.log('Failed to connect to MongoDB:', err);
});


// post request for database (org account info)
app.post('/signup-organizer', (req, res) => {
   console.log(req.body)
   const organizer = new Organizer(req.body);
   organizer.save().then(() => res.redirect("/homeOrg"))
   .catch((err) => {
     if (err.code === 11000) {  // Duplicate key error for unique fields
       res.send("Duplicate entry detected (email or organization number or password already exists)");
     } else {
       console.log(err);
       res.send("An error occurred while saving the data");
     }
   });
});

// post request for database (pil account info)
app.post('/signup-pilgrim', (req, res) => {
    console.log(req.body)
    const pilgrim = new Pilgrim(req.body);
    pilgrim.save().then(() => res.redirect("/homePilg"))
   .catch((err) => {
     if (err.code === 11000) {  // Duplicate key error for unique fields
       res.send("Duplicate entry detected (email or username or password already exists)");
     } else {
       console.log(err);
       res.send("An error occurred while saving the data");
     }
   });
});

// send and receive message in chat
const users = {};  // كائن لتخزين معرف الـ socket بناءً على الـ userId أو الـ username

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // استقبال بيانات تسجيل الدخول من العميل عند الاتصال
  socket.on('login', (userData) => {
      // هنا "userData" يحتوي على معلومات المستخدم مثل "userId" أو "username" و "role"
      users[userData.userId] = socket.id;  // تخزين معرف الـ socket بناءً على userId أو username
      console.log(`User ${userData.username} connected with socket id: ${socket.id}`);
  });

  // استقبال الرسالة من العميل
  socket.on('sendMessage', async (data) => {
      try {
          // حفظ الرسالة في قاعدة البيانات
          const newMessage = new Chat({
              senderId: data.senderId,
              receiverId: data.receiverId,
              message: data.message,
              timestamp: Date.now()  // استخدام `Date.now()` للطابع الزمني
          });

          await newMessage.save();  // حفظ الرسالة في قاعدة البيانات

          // التحقق من أن المستلم متصل
          const targetSocketId = users[data.receiverId];  // الحصول على معرف الـ socket الخاص بالمستلم
          if (targetSocketId) {
              // إرسال الرسالة فقط إلى المستخدم المستلم
              socket.to(targetSocketId).emit('receiveMessage', {
                  senderId: data.senderId,
                  message: data.message
              });
              console.log(`Message sent from ${data.senderId} to ${data.receiverId}`);
          } else {
              console.log(`User ${data.receiverId} is not connected`);
          }

          console.log('Message saved:', newMessage);
      } catch (err) {
          console.error('Error saving message:', err);
      }
  });

  // عند انقطاع الاتصال
  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
      
      // إزالة المستخدم من القائمة عند انقطاعه
      for (const userId in users) {
          if (users[userId] === socket.id) {
              delete users[userId];  // حذف المستخدم من القائمة
              console.log(`User ${userId} disconnected`);
              break;
          }
      }
  });
});



////////////////////////////////////////////////////////////////
//s//
// استيراد التوجيهات
const groupRoutes = require('./routes/groupRoutes');
app.use('/', groupRoutes);



