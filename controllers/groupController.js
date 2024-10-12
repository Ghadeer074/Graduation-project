const Group = require('../models/group');

// عرض جميع المجموعات
exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.render('groups', { groups });
    } catch (err) {
        res.status(500).send('Error retrieving groups');
    }
};

// إضافة مجموعة جديدة
exports.createGroup = async (req, res) => {
    try {
        const newGroup = new Group({
            groupID: req.body.groupID,
            groupProvince: req.body.groupProvince,
            groupSize: req.body.groupSize
        });
        await newGroup.save();
        res.redirect('/groups');
    } catch (err) {
        res.status(500).send('Error creating group');
    }
};