const Organizer = require('../models/userorg'); 

exports.login = async (req, res) => {
    const { password, organizationNumber } = req.body;

    try {
        const organizer = await Organizer.findOne({ organizationNumber, password });
        if (!organizer) {
            return res.status(400).send('Invalid credentials');
        }
        res.redirect('/homeOrg'); 
    } catch (error) {
        console.error('Error occurred during login:', error); 
        res.status(500).send('Server error'); 
    }
};
