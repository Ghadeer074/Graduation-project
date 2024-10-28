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

/*const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Pilgrim = require('../models/pilgrim'); // Ensure this is the correct path for your Pilgrim model

// Middleware to ensure the user is authenticated (assuming you have a login system in place)
const isAuthenticated = (req, res, next) => {
    console.log(req.session); // استخدم هذا لتفقد محتويات الجلسة
    if (req.session && req.session.organizationNumber) {
        return next(); // المستخدم مصدق عليه
    } else {
        res.redirect('/login-organizer'); // إعادة التوجيه إلى صفحة تسجيل الدخول
    }
};


// Add a new group (related to the logged-in organization by organizationNumber)
router.post('/groups', isAuthenticated, async (req, res) => {
    try {
        const newGroup = new Group({
            ...req.body,
            organizationNumber: req.session.organizationNumber // Associate the group with the logged-in organization using organizationNumber
        });
        await newGroup.save();
        res.redirect('/groups'); // Redirect to groups page after adding
    } catch (error) {
        console.error("Error adding group:", error);
        res.status(500).send("Error adding group");
    }
});

// Edit an existing group (must belong to the logged-in organization by organizationNumber)
router.post('/editGroup/:id', isAuthenticated, async (req, res) => {
    try {
        const updatedGroup = await Group.findOneAndUpdate(
            { _id: req.params.id, organizationNumber: req.session.organizationNumber }, // Ensure the group belongs to the logged-in organization
            req.body,
            { new: true }
        );
        if (!updatedGroup) {
            return res.status(404).send("Group not found or you don't have permission to edit this group.");
        }
        res.redirect('/groups'); // Redirect to groups page after editing
    } catch (error) {
        console.error("Error updating group:", error);
        res.status(500).send("Error updating group");
    }
});

// Delete a group (must belong to the logged-in organization by organizationNumber)
router.post('/deleteGroup/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedGroup = await Group.findOneAndDelete({
            _id: req.params.id,
            organizationNumber: req.session.organizationNumber // Ensure the group belongs to the logged-in organization
        });
        if (!deletedGroup) {
            return res.status(404).send("Group not found or you don't have permission to delete this group.");
        }
        res.redirect('/groups'); // Redirect to groups page after deleting
    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).send("Error deleting group");
    }
});

// Display groups page (show only groups related to the logged-in organization by organizationNumber)
router.get('/groups', isAuthenticated, async (req, res) => {
    try {
        const groups = await Group.find({ organizationNumber: req.session.organizationNumber }); // Fetch only groups related to the organization
        res.render('groups', { groups }); // Render groups page with data
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).send("Error fetching groups");
    }
});

// Fetch users in a specific group (must belong to the logged-in organization by organizationNumber)
router.get('/groups/:id/users', isAuthenticated, async (req, res) => {
    try {
        // Make sure to adjust the query to fetch users related to the specific group and organization
        const group = await Group.findOne({ _id: req.params.id, organizationNumber: req.session.organizationNumber });
        if (!group) {
            return res.status(404).send("Group not found or you don't have permission to view users in this group.");
        }
        const pilgrims = await Pilgrim.find({ groupId: req.params.id }); // Fetch related pilgrims
        res.render('pilgrims', { pilgrims }); // Pass 'pilgrims' to the view
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});

// Fetch group details for editing (must belong to the logged-in organization by organizationNumber)
router.get('/groups/:id', isAuthenticated, async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.id, organizationNumber: req.session.organizationNumber });
        if (!group) {
            return res.status(404).send("Group not found or you don't have permission to view this group.");
        }
        res.json(group); // Send group details as JSON
    } catch (error) {
        console.error("Error fetching group:", error);
        res.status(500).send("Error fetching group");
    }
});

module.exports = router;*/
////////////////////////////////////
/*const express = require('express');
const router = express.Router();
const Group = require('../models/group'); // تأكد أن هذا هو مسار الموديل الصحيح
const Pilgrim = require('../models/pilgrim'); // تأكد أن هذا هو مسار موديل الحجاج

// إضافة مجموعة جديدة
router.post('/groups', async (req, res) => {
    try {
        // تأكد من أن لديك userId في الجلسة
        const userId = req.session.userId; 

        // تحقق من أن userId موجود
        if (!userId) {
            return res.status(400).send('User ID is required');
        }

        // إنشاء كائن مجموعة جديد باستخدام البيانات من الطلب
        const newGroup = new Group({
            ...req.body, // اجلب كل البيانات من الجسم
            userId: userId // إضافة userId من الجلسة
        });

        // حفظ المجموعة في قاعدة البيانات
        await newGroup.save();

        // إعادة التوجيه إلى صفحة المجموعات بعد الإضافة
        res.redirect('/groups'); 
    } catch (error) {
        // في حال حدوث خطأ في عملية الحفظ، عرض رسالة خطأ
        console.error('Error adding group:', error);
        res.status(500).send('Error adding group');
    }
});

// عرض جميع المجموعات
router.get('/groups', async (req, res) => {
    try {
        const userId = req.session.userId; // الحصول على userId من الجلسة
        const groups = await Group.find({ userId: userId }); // احضار المجموعات المرتبطة بالـ userId

        res.render('groups', { groups }); // عرض صفحة المجموعات مع البيانات
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).send('Error fetching groups');
    }
});

// تعديل مجموعة
router.post('/editGroup/:id', async (req, res) => {
    try {
        await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/groups'); // إعادة التوجيه إلى صفحة المجموعات بعد التعديل
    } catch (error) {
        console.error('Error updating group:', error);
        res.status(500).send('Error updating group');
    }
});

// حذف مجموعة
router.post('/deleteGroup/:id', async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.redirect('/groups'); // إعادة التوجيه إلى صفحة المجموعات بعد الحذف
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).send('Error deleting group');
    }
});

// Fetch users in a specific group
router.get('/groups/:id/users', async (req, res) => {
    try {
        const pilgrims = await Pilgrim.find({ groupId: req.params.id }); // Adjust according to your Pilgrim model
        res.render('pilgrims', { pilgrims }); // Pass 'pilgrims' to the view
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
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

module.exports = router;*/

const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Pilgrim = require('../models/pilgrim'); // Ensure this is the correct path for your Pilgrim model

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

// Fetch users in a specific group
router.get('/groups/:id/users', async (req, res) => {
    try {
        // Make sure to adjust the query to fetch users related to the specific group
        const pilgrims = await Pilgrim.find({ groupId: req.params.id }); // Adjust according to your Pilgrim model
        res.render('pilgrims', { pilgrims }); // Pass 'pilgrims' to the view
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
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




