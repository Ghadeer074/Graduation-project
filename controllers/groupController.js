/*const Group = require('../models/group');

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
};*/

// groupController.js

/*const Group = require('../models/group'); // تأكد من أن هذا هو نموذج المجموعات لديك

// إضافة مجموعة
exports.addGroup = async (req, res) => {
    try {
        const { groupNumber, governorate, groupSize } = req.body;

        // التحقق من المدخلات
        if (!/^\d{1,10}$/.test(groupNumber) || !/^[a-zA-Z\s]+$/.test(governorate) || groupSize < 1 || groupSize > 60) {
            return res.status(400).send("Invalid input");
        }

        const newGroup = new Group({
            groupNumber,
            governorate,
            groupSize
        });

        await newGroup.save();
        res.redirect('/groups');
    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).send("Error adding group");
    }
};

// تعديل مجموعة
exports.editGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { groupNumber, governorate, groupSize } = req.body;

        // التحقق من المدخلات
        if (!/^\d{1,10}$/.test(groupNumber) || !/^[a-zA-Z\s]+$/.test(governorate) || groupSize < 1 || groupSize > 60) {
            return res.status(400).send("Invalid input");
        }

        await Group.findByIdAndUpdate(groupId, {
            groupNumber,
            governorate,
            groupSize
        });

        res.redirect('/groups');
    } catch (error) {
        console.error("Error editing group:", error);
        res.status(500).send("Error editing group");
    }
};

// حذف مجموعة
exports.deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;

        await Group.findByIdAndDelete(groupId);
        res.redirect('/groups');
    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).send("Error deleting group");
    }
};

// جلب بيانات مجموعة للتعديل
exports.getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        res.json(group);
    } catch (error) {
        console.error("Error fetching group data:", error);
        res.status(500).send("Error fetching group data");
    }
};*/



const Group = require('../models/group');

// إضافة مجموعة
exports.addGroup = async (req, res) => {
    try {
        const { groupNumber, governorate, groupSize } = req.body;

        // التحقق من المدخلات
        if (!/^\d{1,10}$/.test(groupNumber) || !/^[a-zA-Z\s]+$/.test(governorate) || groupSize < 1 || groupSize > 60) {
            return res.status(400).send("Invalid input");
        }

        const newGroup = new Group({
            groupNumber,
            governorate,
            groupSize
        });

        await newGroup.save();
        res.redirect('/groups'); // إعادة التوجيه بعد الإضافة
    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).send("Error adding group");
    }
};

// تعديل مجموعة
exports.editGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { groupNumber, governorate, groupSize } = req.body;

        // التحقق من المدخلات
        if (!/^\d{1,10}$/.test(groupNumber) || !/^[a-zA-Z\s]+$/.test(governorate) || groupSize < 1 || groupSize > 60) {
            return res.status(400).send("Invalid input");
        }

        await Group.findByIdAndUpdate(groupId, {
            groupNumber,
            governorate,
            groupSize
        });

        res.redirect('/groups'); // إعادة التوجيه بعد التعديل
    } catch (error) {
        console.error("Error editing group:", error);
        res.status(500).send("Error editing group");
    }
};

//حذف المجموعه 
exports.deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;

        await Group.findByIdAndDelete(groupId);
        res.redirect('/groups'); // إعادة التوجيه بعد الحذف
    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).send("Error deleting group");
    }
};
// جلب بيانات مجموعة للتعديل
exports.getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        res.json(group); // إرسال تفاصيل المجموعة
    } catch (error) {
        console.error("Error fetching group data:", error);
        res.status(500).send("Error fetching group data");
    }
};







