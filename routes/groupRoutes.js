const express = require('express');
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

module.exports = router;