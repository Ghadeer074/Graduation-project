const Organizer = require('../models/Organizer'); // Import your Organizer model

exports.login = async (req, res) => {
    const { password, organizationNumber } = req.body;

    try {
        const organizer = await Organizer.findOne({ organizationNumber, password });
        if (!organizer) {
            return res.status(400).send('Invalid credentials');
        }
        // Set up session or JWT here as needed
        res.redirect('/homeOrg'); // Redirect to homepage after successful login
    } catch (error) {
        res.status(500).send('Server error');
    }
};
