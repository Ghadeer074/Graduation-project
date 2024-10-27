const Pilgrim = require('../models/userpil'); // Use userpil.js

// Handle a GET request for homePilg page (Pilgrim Homepage)
const homePil = async (req, res) => {
    try {
        const username = req.query.username; // Get the username from query params

        if (!username) {
            return res.status(400).send('No username provided');
        }

        const pilgrim = await Pilgrim.findOne({ username });

        if (!pilgrim) {
            return res.status(404).send('Pilgrim not found');
        }

        // Pass the pilgrim data and an empty flight object to the view
        res.render('homePilg', { pilgrim, flight: {} });  // Empty flight object
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
};


module.exports = {
    homePil
};
