/*const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// عرض جميع المجموعات
router.get('/groups', groupController.getAllGroups);

// عرض صفحة إنشاء مجموعة جديدة
router.get('/groups/new', (req, res) => {
    res.render('groups-new');
});

// إضافة مجموعة جديدة
router.post('/groups', groupController.createGroup);

module.exports = router;*/

// groupRoutes.js

// groupRoutes.js

const express = require('express');
const router = express.Router();
const Group = require('../models/group');

// Add a new group
router.post('/groups', async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        await newGroup.save();
        res.redirect('/groups'); // Redirect to groups page after adding
    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).send("Error adding group");
    }
});

// Edit an existing group
router.post('/editGroup/:id', async (req, res) => {
    try {
        await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/groups'); // Redirect to groups page after editing
    } catch (error) {
        console.error("Error updating group:", error);
        res.status(500).send("Error updating group");
    }
});

// Delete a group
router.post('/deleteGroup/:id', async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.redirect('/groups'); // Redirect to groups page after deleting
    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).send("Error deleting group");
    }
});

// Display groups page
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find(); // Fetch all groups
        res.render('groups', { groups }); // Render groups page with data
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).send("Error fetching groups");
    }
});

// Fetch group details for editing
router.get('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        res.json(group); // Send group details as JSON
    } catch (error) {
        console.error("Error fetching group:", error);
        res.status(500).send("Error fetching group");
    }
});

module.exports = router; 

