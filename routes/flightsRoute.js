const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

// Route to display the flights management page
router.get('/', flightsController.getFlights);

// Route to add a new flight
router.post('/add', flightsController.addFlight);

// Route to get a single flight by ID
router.get('/:id', flightsController.getFlightById);

// Route to edit an existing flight
router.post('/edit/:id', flightsController.editFlight);

// Route to delete a flight
router.post('/delete/:id', flightsController.deleteFlight);

module.exports = router;