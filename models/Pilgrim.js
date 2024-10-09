const mongoose = require('mongoose');

const pilgrimSchema = new mongoose.Schema({
    passportNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    province: { type: String, required: true },
    flightNumber: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    destination: { type: String, required: true }
});

const PilgrimModel = mongoose.model('PilgrimModel', pilgrimSchema);

module.exports = PilgrimModel;