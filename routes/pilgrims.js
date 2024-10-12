const express = require('express');
const router = express.Router();
const pilgrimsController = require('../controllers/pilgrims');

// Route to display the pilgrims management page
router.get('/', pilgrimsController.getPilgrims);

// Route to add a new pilgrim
router.post('/add', pilgrimsController.addPilgrim);

// Route to get a single pilgrim by ID
router.get('/:id', pilgrimsController.getPilgrimById);

// Route to edit an existing pilgrim
router.post('/edit/:id', pilgrimsController.editPilgrim);

// Route to delete a pilgrim
router.post('/delete/:id', pilgrimsController.deletePilgrim);

module.exports = router;