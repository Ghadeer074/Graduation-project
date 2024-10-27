const PilgrimModel = require('../models/pilgrim');

// Display the pilgrims management page
exports.getPilgrims = async (req, res) => {
    try {
        const pilgrims = await PilgrimModel.find();
        res.render('pilgrims', { pilgrims });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add a new pilgrim
exports.addPilgrim = async (req, res) => {
    try {
        const newPilgrim = new PilgrimModel(req.body);
        await newPilgrim.save();
        res.redirect('/');  // Redirect to the homepage or pilgrims list after adding
    } catch (error) {
        res.status(500).json({ error: 'Failed to add pilgrim' });
    }
};

// Get a single pilgrim by ID
exports.getPilgrimById = async (req, res) => {
    try {
        const pilgrim = await PilgrimModel.findById(req.params.id);
        if (!pilgrim) {
            return res.status(404).json({ error: 'Pilgrim not found' });
        }
        res.json(pilgrim); // You can adjust this to render a page if needed
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pilgrim' });
    }
};

// Edit an existing pilgrim
exports.editPilgrim = async (req, res) => {
    try {
        const updatedPilgrim = await PilgrimModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPilgrim) {
            return res.status(404).json({ error: 'Pilgrim not found' });
        }
        res.json({ message: 'Pilgrim updated successfully', pilgrim: updatedPilgrim });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update pilgrim' });
    }
};

// Delete a pilgrim
exports.deletePilgrim = async (req, res) => {
    try {
        const deletedPilgrim = await PilgrimModel.findByIdAndDelete(req.params.id);
        if (!deletedPilgrim) {
            return res.status(404).json({ error: 'Pilgrim not found' });
        }
        res.json({ message: 'Pilgrim deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete pilgrim' });
    }
};
