const Pilgrim = require('../models/Pilgrim'); // Import your Pilgrim model

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pilgrim = await Pilgrim.findOne({ username, password });
        if (!pilgrim) {
            return res.status(400).send('Invalid credentials');
        }
        // Set up session or JWT here as needed
        res.redirect('/homePlig'); // Redirect to homepage after successful login
    } catch (error) {
        res.status(500).send('Server error');
    }
};
