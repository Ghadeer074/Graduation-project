const Organizer = require('../models/userorg'); // Import the organizer model

exports.login = async (req, res) => {
    const { organization, password } = req.body;  // Fetch organization from the form (not organizationNumber)

    console.log('Organization Number:', organization);  // Log the organization number for debugging

    try {
        const organizer = await Organizer.findOne({ OrganizationNumber: organization });  // Query based on organization
        console.log('Organizer Found:', organizer);  // Log if organizer is found

        if (!organizer) {
            return res.status(400).send('Invalid organization number');
        }

        if (organizer.password !== password) {
            return res.status(400).send('Invalid password');
        }

        // Redirect to the organizer's homepage with the organization number in the query string
        res.redirect(`/homeOrg?organizationNumber=${encodeURIComponent(organizer.OrganizationNumber)}`);
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).send('Server error');
    }
};





// Verify Identity Controller
exports.verifyIdentity = async (req, res) => {
    const { organizationNumber } = req.body; 

    try {
        const organizer = await Organizer.findOne({ OrganizationNumber: organizationNumber }); 
        if (organizer) {
            res.render('reset-password-organizer', { organizationNumber });  
        } else {
            res.status(400).send('Invalid organization number.');
        }
    } catch (error) {
        console.error('An error occurred while verifying the organization:', error);
        res.status(500).send('Server error.');
    }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
    const { organizationNumber, newPassword } = req.body;
    
    console.log('Organization Number:', organizationNumber);  
    try {
        const organizer = await Organizer.findOne({ OrganizationNumber: organizationNumber });
        if (organizer) {
            organizer.password = newPassword;  
            await organizer.save();
            res.render('login-organizer', { message: 'Your password has been updated successfully. You can log in now.' });
        } else {
            return res.status(400).send('Password update error: Organizer does not exist.');
        }
    } catch (error) {
        console.error('An error occurred while updating the password:', error);
        return res.status(500).send('Server error.');
    }
};

    
 


















