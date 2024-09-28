//s//
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// عرض صفحة المجموعات
router.get('/groups', groupController.viewGroupsPage);

module.exports = router;
