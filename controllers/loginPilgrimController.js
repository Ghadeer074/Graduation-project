const Pilgrim = require('../models/userpil'); 

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pilgrim = await Pilgrim.findOne({ username, password });
        
        if (!pilgrim) {
            return res.status(400).send('Invalid credentials');  
        }

        res.redirect('/homePilg'); 
    } catch (error) {
        console.error('Error occurred during login:', error); 
        res.status(500).send('Server error'); 
    }
};

