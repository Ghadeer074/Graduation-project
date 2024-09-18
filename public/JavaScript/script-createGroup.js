function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function showConfirmationPopup(groupNumber, province, maxNumber) {
    var confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerHTML = `
        Are you sure you want to create Group ${groupNumber} with the following details?<br>
        Province: ${province}<br>
        Max Number: ${maxNumber}
    `;
    document.getElementById('confirmationPopup').style.display = 'flex';
}

function cancelCreation() {
    document.getElementById('confirmationPopup').style.display = 'none';
}

function confirmCreation() {
    alert("Group has been created successfully!");
    document.getElementById('confirmationPopup').style.display = 'none';
    closePopup();
}

function validateForm() {
    var groupNumber = document.getElementById('groupNumber').value;
    var province = document.getElementById('province').value;
    var maxNumber = document.getElementById('maxNumber').value;
    var errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = '';

    var emptyFields = [];

    if (!groupNumber) emptyFields.push("Group Number");
    if (!province) emptyFields.push("Province");
    if (!maxNumber || maxNumber <= 0) emptyFields.push("Max Number");

    if (emptyFields.length > 0) {
        errorMessage.innerHTML = 'Please fill the ' + emptyFields.join(' and ') + ' fields.';
    } else {
        showConfirmationPopup(groupNumber, province, maxNumber);
    }
}

function validateNumbers(input) {
    input.value = input.value.replace(/[^\d]/g, '');
}

function validateText(input) {
    input.value = input.value.replace(/[^a-zA-Zا-ي]/g, '');
}



