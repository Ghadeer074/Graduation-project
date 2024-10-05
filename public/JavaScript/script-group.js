  // تعريف العناصر
const addGroupBtn = document.getElementById('addGroupBtn');
const addGroupPopup = document.getElementById('addGroupPopup');
const closeAddPopup = document.getElementById('closeAddPopup');
const addGroupForm = document.getElementById('addGroupForm');
const deleteGroupPopup = document.getElementById('deleteGroupPopup');
const closeDeletePopup = document.getElementById('closeDeletePopup');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const editGroupPopup = document.getElementById('editGroupPopup');
const closeEditPopup = document.getElementById('closeEditPopup');
const editGroupForm = document.getElementById('editGroupForm');

// تعريف متغير لتخزين ID المجموعة التي سيتم حذفها
let groupIdToDelete;

// إظهار نافذة إضافة المجموعة
addGroupBtn.addEventListener('click', () => {
    addGroupPopup.style.display = 'block';
});

// إغلاق نافذة إضافة المجموعة
closeAddPopup.addEventListener('click', () => {
    addGroupPopup.style.display = 'none';
});

// إضافة مجموعة جديدة
addGroupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addGroupForm);
    const response = await fetch('/groups', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        location.reload(); // إعادة تحميل الصفحة بعد الإضافة
    }
});

// إغلاق نافذة حذف المجموعة
closeDeletePopup.addEventListener('click', () => {
    deleteGroupPopup.style.display = 'none';
});

// تأكيد حذف مجموعة
confirmDeleteBtn.addEventListener('click', async () => {
    const response = await fetch(`/groups/${groupIdToDelete}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        location.reload(); // إعادة تحميل الصفحة بعد الحذف
    }
});

// إغلاق نافذة تعديل المجموعة
closeEditPopup.addEventListener('click', () => {
    editGroupPopup.style.display = 'none';
});

// إظهار نافذة تعديل المجموعة
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
        const groupId = e.target.getAttribute('data-id');
        const response = await fetch(`/groups/${groupId}`);
        const group = await response.json();
        
        // ملء الحقول في نموذج التعديل
        document.getElementById('editGroupNumber').value = group.groupID;
        document.getElementById('editGovernorate').value = group.groupProvince;
        document.getElementById('editMaxMembers').value = group.groupSize;

        // تعيين ID المجموعة للتحديث
        editGroupForm.setAttribute('data-id', groupId);
        
        // إظهار نافذة تعديل المجموعة
        editGroupPopup.style.display = 'block';
    });
});

// تحديث مجموعة
editGroupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const groupId = editGroupForm.getAttribute('data-id');
    const formData = new FormData(editGroupForm);
    const response = await fetch(`/groups/${groupId}`, {
        method: 'PUT',
        body: formData
    });
    if (response.ok) {
        location.reload(); // إعادة تحميل الصفحة بعد التحديث
    }
});

// إظهار نافذة حذف المجموعة
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        groupIdToDelete = e.target.getAttribute('data-id');
        deleteGroupPopup.style.display = 'block';
    });
});

// إغلاق نافذة حذف المجموعة
cancelDeleteBtn.addEventListener('click', () => {
    deleteGroupPopup.style.display = 'none';
});
