 function signUpOrg(){
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var orgname = document.getElementById('orgname');
    var orgNum = document.getElementById('orgnum');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('password');
    var msg = document.getElementById('msg');

    // Reset styles and messages
    resetStyles();

    if (firstName.value.trim().isEmpty()) {
        setStyleAndMsg(firstName, "You must enter your first name.");
    } else if (!isAlpha(firstName.value)) {
        setStyleAndMsg(firstName, "First name must contain letters.");
    }

    if (lastName.value.trim().isEmpty()) {
        setStyleAndMsg(lastName, "You must enter your last name.");
    } else if (!isAlpha(lastName.value)) {
        setStyleAndMsg(lastName, "Last name must contain letters.");
    }

    if (orgname.value.trim().isEmpty()) {
        setStyleAndMsg(orgname, "You must enter a organization name.");
    } else if (!isAlphaNumeric(orgname.value)) {
        setStyleAndMsg(orgname, "Organization must contain letters.");
    }

    
    if (orgNum.value.trim().isEmpty()){
        setStyleAndMsg(orgNum, "You must enter organization number.");
    } else if (!isNumeric(orgNum.value) || orgNum.value.length !== 10) {
        setStyleAndMsg(orgNum, "organization must be 10 digits.");
    }

    if (email.value.trim().isEmpty()){
        setStyleAndMsg(email, "You must enter an email.");
    }

    if (phoneNumber.value.trim().isEmpty()){
        setStyleAndMsg(phoneNumber, "You must enter your phone number.");
    } else if (!isNumeric(phoneNumber.value) || phoneNumber.value.length !== 10) {
        setStyleAndMsg(phoneNumber, "Phone number must be 10 digits.");
    }

    if (password.value.trim().isEmpty()){
        setStyleAndMsg(password, "You must enter a password.");
    } else if (!isPasswordValid(password.value)) {
        setStyleAndMsg(password, "Password must be 8 digits, have at least one uppercase letter, one lowercase letter, and one digit.");
    }
}

function resetStyles(){
    var elements = document.querySelectorAll('input');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.borderColor = '';
        elements[i].style.backgroundColor = '';
    }
    msg.textContent = '';
}

function setStyleAndMsg(element, message) {
    element.style.borderColor = 'red';
    element.style.backgroundColor = '#E3F4F4';
    msg.textContent = message;
}

function isAlpha(value){
    return /^[a-zA-Z]+$/.test(value);
}

function isAlphaNumeric(value){
    return /^[a-zA-Z0-9]+$/.test(value);
}

function isNumeric(value) {
    return /^[0-9]+$/.test(value);
}

function isPasswordValid(value) {
    if (value.length < 8){
        return false;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(value)){
        return false;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(value)){
        return false;
    }

    // At least one digit
    if (!/\d/.test(value)){
        return false;
    }
    return true; 
} 

// Enable 'Agree and Continue' button when checkbox is checked in the modal
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

// Enable the signup button once the user has agreed to terms
document.getElementById('agreeCheckboxSignup').addEventListener('change', function() {
    const signupButton = document.getElementById('signupButton');
    signupButton.disabled = !this.checked;
});
