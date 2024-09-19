const express = require("express");
const router = express.Router();
const control = require("./controller");

// reandring request page (landing page) - get request 
app.get('/',(req,res)=> { 
 res.sendFile("./views/index.ejs")
})
router.get('/',control.landing);

//router.post('/index',control.index);

//module.exports = router;