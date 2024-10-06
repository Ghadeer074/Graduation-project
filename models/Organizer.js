const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    password: { type: String, required: true },
    organizationNumber: { type: String, required: true },
});

// Check if the model already exists, and use it if it does
const Organizer = mongoose.models.Organizer || mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
