const editPopup = document.getElementById('edit-popup');
const showEditPopupBtn = document.getElementById('showEditPopupBtn');

showEditPopupBtn.addEventListener('click', () => {
    editPopup.style.display = 'block';
});

function closeEditPopup() {
    editPopup.style.display = 'none';
}

function confirmEditAction() {
    alert('Edit action confirmed');
    closeEditPopup();
}

const deletePopup = document.getElementById('delete-popup');
const showDeletePopupBtn = document.getElementById('showDeletePopupBtn');

showDeletePopupBtn.addEventListener('click', () => {
    deletePopup.style.display = 'block';
});

function closeDeletePopup() {
    deletePopup.style.display = 'none';
}

function confirmDeleteAction() {
    alert('Pilgrim Deleted');
    closeDeletePopup();
}