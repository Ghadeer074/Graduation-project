const FlightModel = require('../models/flight');

exports.getFlights = async (req, res) => {
    try {
        const flights = await FlightModel.find();
        res.render('flights', { flights });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addFlight = async (req, res) => {
    try {
        const newFlight = new FlightModel(req.body);
        await newFlight.save();
        res.status(201).json({ message: 'Flight added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add flight' });
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await FlightModel.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flight' });
    }
};

exports.editFlight = async (req, res) => {
    try {
        const updatedFlight = await FlightModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFlight) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json({ message: 'Flight updated successfully', flight: updatedFlight });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update flight' });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await FlightModel.findByIdAndDelete(req.params.id);
        if (!deletedFlight) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete flight' });
    }
};