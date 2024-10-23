const Pilgrim = require('../models/userpil');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pilgrim = await Pilgrim.findOne({ username });
        if (!pilgrim) {
            return res.status(400).send('Invalid username');
        }

        if (pilgrim.password !== password) {
            return res.status(400).send('Invalid password');
        }

        res.redirect('/homePilg'); 
    } catch (error) {
        console.error('Error occurred during login:', error); 
        res.status(500).send('Server error'); 
    }
};

exports.verifyIdentity = async (req, res) => {
    const { username } = req.body;

    try {
        const pilgrim = await Pilgrim.findOne({ username });
        if (pilgrim) {
            // إذا وجد المستخدم، انتقل إلى صفحة إعادة تعيين كلمة المرور
            res.render('reset-password-pilgrim', { username }); 
        } else {
            res.status(400).send('Invalid username.');
        }
    } catch (error) {
        console.error('An error occurred while verifying the user:', error);
        res.status(500).send('Server error.');
    }
};


exports.resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    console.log('Username:', username);
    console.log('New Password:', newPassword);

    try {
        const pilgrim = await Pilgrim.findOne({ username });
        if (pilgrim) {
            pilgrim.password = newPassword;
            await pilgrim.save();
            console.log('Password updated successfully');
            res.render('login-pilgrim', { message: 'Your password has been updated successfully. You can log in now.' });
        } else {
            return res.status(400).send('Password update error: User does not exist.');
        }
    } catch (error) {
        console.error('An error occurred while updating your password:', error);
        return res.status(500).send('Server error.');
    }
};













