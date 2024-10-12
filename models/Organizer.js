const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    password: { type: String, required: true },
    organizationNumber: { type: String, required: true },
});

const Organizer = mongoose.models.Organizer || mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
