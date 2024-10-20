const FlightModel = require('../models/flight');

exports.getFlights = async (req, res) => {
    try {
        const flights = await FlightModel.find();
        res.render('flights', { flights });
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).render('error', { 
            message: 'Failed to fetch flights', 
            error: error 
        });
    }
};

exports.addFlight = async (req, res) => {
    try {
        const newFlight = new FlightModel(req.body);
        await newFlight.save();
        res.status(201).json({ message: 'Flight added successfully' });
    } catch (error) {
        console.error('Error adding flight:', error);
        res.status(500).json({ error: 'Failed to add flight', details: error.message });
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
        console.error('Error fetching flight by ID:', error);
        res.status(500).json({ error: 'Failed to fetch flight', details: error.message });
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
        console.error('Error updating flight:', error);
        res.status(500).json({ error: 'Failed to update flight', details: error.message });
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
        console.error('Error deleting flight:', error);
        res.status(500).json({ error: 'Failed to delete flight', details: error.message });
    }
};