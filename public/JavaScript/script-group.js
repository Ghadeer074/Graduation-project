 // JavaScript to handle popups and CRUD operations
 const addGroupBtn = document.getElementById('addGroupBtn');
 const addGroupPopup = document.getElementById('addGroupPopup');
 const closeAddPopup = document.getElementById('closeAddPopup');
 const deleteGroupPopup = document.getElementById('deleteGroupPopup');
 const closeDeletePopup = document.getElementById('closeDeletePopup');
 const editGroupPopup = document.getElementById('editGroupPopup');
 const closeEditPopup = document.getElementById('closeEditPopup');

 let groups = []; // This will hold our group data
 let currentGroupId = null;

 addGroupBtn.onclick = () => {
     addGroupPopup.style.display = 'flex';
 };

 closeAddPopup.onclick = () => {
     addGroupPopup.style.display = 'none';
 };

 closeDeletePopup.onclick = () => {
     deleteGroupPopup.style.display = 'none';
 };

 closeEditPopup.onclick = () => {
     editGroupPopup.style.display = 'none';
 };

 // Add Group form submission
 document.getElementById('addGroupForm').onsubmit = (e) => {
     e.preventDefault();
     const groupNumber = document.getElementById('groupNumber').value;
     const governorate = document.getElementById('governorate').value;
     const maxMembers = document.getElementById('maxMembers').value;

     const newGroup = { id: Date.now(), groupNumber, governorate, maxMembers };
     groups.push(newGroup);
     renderGroups();
     addGroupPopup.style.display = 'none';
 };

 function renderGroups() {
     const tbody = document.getElementById('groupsTable').getElementsByTagName('tbody')[0];
     tbody.innerHTML = ''; // Clear existing groups
     groups.forEach(group => {
         const row = tbody.insertRow();
         row.insertCell(0).innerText = group.groupNumber;
         row.insertCell(1).innerText = group.governorate;
         row.insertCell(2).innerText = group.maxMembers;

         const actionsCell = row.insertCell(3);
         actionsCell.innerHTML = `
             <button class="button" onclick="confirmDelete(${group.id})">Delete</button>
             <button class="button" onclick="openEditGroupPopup(${group.id})">Edit</button>
         `;
     });
 }

 function confirmDelete(id) {
     currentGroupId = id;
     const groupToDelete = groups.find(g => g.id === id);
     document.getElementById('deleteConfirmationMessage').innerText = `Are you sure you want to delete the group "${groupToDelete.groupNumber}"?`;
     deleteGroupPopup.style.display = 'flex';
 }

 document.getElementById('confirmDeleteBtn').onclick = () => {
     groups = groups.filter(g => g.id !== currentGroupId);
     renderGroups();
     deleteGroupPopup.style.display = 'none';
 };

 document.getElementById('cancelDeleteBtn').onclick = () => {
     deleteGroupPopup.style.display = 'none';
 };

 function openEditGroupPopup(id) {
     const groupToEdit = groups.find(g => g.id === id);
     document.getElementById('editGroupNumber').value = groupToEdit.groupNumber;
     document.getElementById('editGovernorate').value = groupToEdit.governorate;
     document.getElementById('editMaxMembers').value = groupToEdit.maxMembers;
     currentGroupId = id;
     editGroupPopup.style.display = 'flex';
 }

 document.getElementById('editGroupForm').onsubmit = (e) => {
     e.preventDefault();
     const updatedGroup = {
         id: currentGroupId,
         groupNumber: document.getElementById('editGroupNumber').value,
         governorate: document.getElementById('editGovernorate').value,
         maxMembers: document.getElementById('editMaxMembers').value,
     };
     groups = groups.map(g => (g.id === currentGroupId ? updatedGroup : g));
     renderGroups();
     editGroupPopup.style.display = 'none';
 };
