 // JavaScript to enable the 'Agree and Continue' button only when the checkbox is checked
 document.getElementById('agreeCheckbox').addEventListener('change', function() {
    const agreeButton = document.getElementById('agreeButton');
    if (this.checked) {
        agreeButton.classList.remove('btn-disabled');
        agreeButton.disabled = false;
    } else {
        agreeButton.classList.add('btn-disabled');
        agreeButton.disabled = true;
    }
});

// Close the modal when the 'Agree and Continue' button is clicked
document.getElementById('agreeButton').addEventListener('click', function() {
    $('#termsModal').modal('hide');
});