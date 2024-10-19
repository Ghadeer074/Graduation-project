const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    destination: { type: String, required: true },
    
});

const FlightModel = mongoose.model('FlightModel', flightSchema);

module.exports = FlightModel;