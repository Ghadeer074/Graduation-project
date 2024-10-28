 // تعريف العناصر
/*const addGroupBtn = document.getElementById('addGroupBtn');
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
});*/


function validateGroupForm(groupNumber, governorate, groupSize) {
    // Use greedy validation approach to check inputs
    return [
        /^\d{1,10}$/.test(groupNumber) ? null : "Group Number must be a number and up to 10 digits.",
        /^[a-zA-Z\s]+$/.test(governorate) ? null : "Governorate must contain only letters.",
        (groupSize >= 1 && groupSize <= 60) ? null : "Group Size must be a number between 1 and 60."
    ].filter(Boolean); // Filter out null values
}

// Show Add Group Popup
document.getElementById("addGroupBtn").onclick = function () {
    document.getElementById("addGroupPopup").style.display = "block";
};

// Close Add Group Popup
document.getElementById("closeAddPopup").onclick = function () {
    document.getElementById("addGroupPopup").style.display = "none";
};

// Handle Add Group Form Submission
document.getElementById("addGroupForm").onsubmit = function (event) {
    event.preventDefault();  // Prevent default form submission behavior

    const groupNumber = document.getElementById("groupNumber").value;
    const governorate = document.getElementById("governorate").value;
    const groupSize = document.getElementById("groupSize").value;

    const errors = validateGroupForm(groupNumber, governorate, groupSize);

    if (errors.length > 0) {
        alert(errors.join('\n')); // Show error messages
    } else {
        // Prepare the data to be sent in the add request
        const newGroupData = {
            groupNumber: groupNumber,
            governorate: governorate,
            groupSize: groupSize
        };

        // Send the add group request to the server
        fetch('/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroupData)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("addGroupPopup").style.display = "none"; // Hide popup after success
                location.reload(); // Reload the page to see the new group
            } else {
                throw new Error('Failed to add the group.');
            }
        })
        .catch(error => {
            console.error('Error adding group:', error);
            alert('An error occurred while adding the group.');
        });
    }
};

// Handle Edit Group functionality
const editBtns = document.querySelectorAll(".edit-btn");
editBtns.forEach(btn => {
    btn.onclick = function () {
        const groupId = this.getAttribute("data-id");
        document.getElementById("editGroupId").value = groupId;

        // Fetch group data and populate the form
        fetch(`/groups/${groupId}`)
            .then(response => response.json())
            .then(group => {
                document.getElementById("editGroupNumber").value = group.groupNumber;
                document.getElementById("editGovernorate").value = group.governorate;
                document.getElementById("editGroupSize").value = group.groupSize;
                document.getElementById("editGroupPopup").style.display = "block";
            })
            .catch(error => {
                console.error('Error fetching group data:', error);
                alert('An error occurred while fetching the group data.');
            });
    };
});

// Close Edit Group Popup
document.getElementById("closeEditPopup").onclick = function () {
    document.getElementById("editGroupPopup").style.display = "none";
};

// Handle Edit Group Form Submission
document.getElementById("editGroupForm").onsubmit = function (event) {
    event.preventDefault();  // Prevent default form submission behavior

    const groupId = document.getElementById("editGroupId").value;
    const groupNumber = document.getElementById("editGroupNumber").value;
    const governorate = document.getElementById("editGovernorate").value;
    const groupSize = document.getElementById("editGroupSize").value;

    const errors = validateGroupForm(groupNumber, governorate, groupSize);

    if (errors.length > 0) {
        alert(errors.join('\n')); // Show error messages
    } else {
        // Prepare the data to be sent in the edit request
        const editedGroupData = {
            groupNumber: groupNumber,
            governorate: governorate,
            groupSize: groupSize
        };

        // Send the update request
        fetch(`/editGroup/${groupId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedGroupData)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("editGroupPopup").style.display = "none"; // Hide popup after success
                location.reload(); // Reload the page to see the changes
            } else {
                throw new Error('Failed to update the group.');
            }
        })
        .catch(error => {
            console.error('Error updating group:', error);
            alert('An error occurred while updating the group.');
        });
    }
};

// Show Delete Confirmation Popup
const deleteBtns = document.querySelectorAll(".delete-btn");
let groupIdToDelete;
deleteBtns.forEach(btn => {
    btn.onclick = function () {
        groupIdToDelete = this.getAttribute("data-id");

        // Fetch group details and show Group Number in delete confirmation
        fetch(`/groups/${groupIdToDelete}`)
            .then(response => response.json())
            .then(group => {
                document.getElementById("deleteConfirmationMessage").innerText = `Are you sure you want to delete Group Number: ${group.groupNumber}?`;
                document.getElementById("deleteGroupPopup").style.display = "block";
            })
            .catch(error => {
                console.error('Error fetching group data for deletion:', error);
                alert('An error occurred while fetching group data.');
            });
    };
});

// Close Delete Confirmation Popup
document.getElementById("closeDeletePopup").onclick = function () {
    document.getElementById("deleteGroupPopup").style.display = "none";
};

// Confirm Deletion
document.getElementById("confirmDeleteBtn").onclick = function () {
    fetch(`/deleteGroup/${groupIdToDelete}`, { method: 'POST' })
        .then(() => {
            document.getElementById("deleteGroupPopup").style.display = "none"; // Hide popup
            location.reload(); // Reload the page to reflect changes
        })
        .catch(error => {
            console.error('Error deleting group:', error);
            alert('An error occurred while deleting the group.');
        });
};

// Cancel Deletion
document.getElementById("cancelDeleteBtn").onclick = function () {
    document.getElementById("deleteGroupPopup").style.display = "none";
};
