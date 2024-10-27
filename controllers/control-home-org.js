const Organizer = require('../models/userorg'); // Import the organizer model

const homeOrg = async (req, res) => {
    try {
        const organizationNumber = req.query.organizationNumber;  // Get the organization number from the query string

        if (!organizationNumber) {
            return res.status(400).send('No organization number provided');
        }

        const organizer = await Organizer.findOne({ OrganizationNumber: organizationNumber });

        if (!organizer) {
            return res.status(404).send('Organizer not found');
        }

        // Log the organizer object to check if OrganizationName is fetched
        console.log('Organizer Data:', organizer);

        // Render the view with organizer data
        res.render('homeOrg', { organizer });
    } catch (error) {
        console.error('Error fetching organizer data:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    homeOrg
};
