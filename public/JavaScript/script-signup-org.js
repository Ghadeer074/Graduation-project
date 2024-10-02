// Frontend JavaScript for Sign-Up Validation and Terms Modal Interaction

// Function to handle the form validation for the organizer sign-up page
function signUpOrg() {
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var orgname = document.getElementById('orgname');
    var orgNum = document.getElementById('orgnum');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('password');
    var msg = document.getElementById('msg');
    let isValid = true; // Flag to track validation status

    // Reset styles and messages
    resetStyles();

    // Add form validation checks for each field
    if (firstName.value.trim() === '') {
        setStyleAndMsg(firstName, "You must enter your first name.");
        isValid = false;
    } else if (!isAlpha(firstName.value)) {
        setStyleAndMsg(firstName, "First name must contain letters.");
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        setStyleAndMsg(lastName, "You must enter your last name.");
        isValid = false;
    } else if (!isAlpha(lastName.value)) {
        setStyleAndMsg(lastName, "Last name must contain letters.");
        isValid = false;
    }

    if (orgname.value.trim() === '') {
        setStyleAndMsg(orgname, "You must enter an organization name.");
        isValid = false;
    } else if (!isAlphaNumeric(orgname.value)) {
        setStyleAndMsg(orgname, "Organization name must contain only alphanumeric characters.");
        isValid = false;
    }

    if (orgNum.value.trim() === '') {
        setStyleAndMsg(orgNum, "You must enter the organization number.");
        isValid = false;
    } else if (!isNumeric(orgNum.value) || orgNum.value.length !== 10) {
        setStyleAndMsg(orgNum, "Organization number must be 10 digits.");
        isValid = false;
    }

    if (email.value.trim() === '') {
        setStyleAndMsg(email, "You must enter an email.");
        isValid = false;
    }

    if (phoneNumber.value.trim() === '') {
        setStyleAndMsg(phoneNumber, "You must enter your phone number.");
        isValid = false;
    } else if (!isNumeric(phoneNumber.value) || phoneNumber.value.length !== 10) {
        setStyleAndMsg(phoneNumber, "Phone number must be 10 digits.");
        isValid = false;
    }

    if (password.value.trim() === '') {
        setStyleAndMsg(password, "You must enter a password.");
        isValid = false;
    } else if (!isPasswordValid(password.value)) {
        setStyleAndMsg(password, "Password must be 8 digits, have at least one uppercase letter, one lowercase letter, and one digit.");
        isValid = false;
    }

    // If all checks pass, return true to submit the form; otherwise, return false to prevent submission
    return isValid;
}

// Reset the styles for the form inputs
function resetStyles() {
    var elements = document.querySelectorAll('input');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.borderColor = '';
        elements[i].style.backgroundColor = '';
    }
    if (msg) msg.textContent = ''; // Reset error message, if any
}

// Set error styles and display an error message
function setStyleAndMsg(element, message) {
    element.style.borderColor = 'red';
    element.style.backgroundColor = '#E3F4F4';
    msg.textContent = message; 
}

// Utility functions for input validation
function isAlpha(value) {
    return /^[a-zA-Z]+$/.test(value);
}

function isAlphaNumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
}

function isNumeric(value) {
    return /^[0-9]+$/.test(value);
}

function isPasswordValid(value) {
    return value.length >= 8 &&
           /[A-Z]/.test(value) && 
           /[a-z]/.test(value) && 
           /\d/.test(value);
}

// Enable the "Create Account" button only when the user agrees to the terms
document.getElementById('agreeCheckbox').addEventListener('change', function() {
    const createAccountButton = document.getElementById('bt');
    if (this.checked) {
        createAccountButton.disabled = false;
        createAccountButton.style.opacity = 1; // Make it fully visible
    } else {
        createAccountButton.disabled = true;
        createAccountButton.style.opacity = 0.5; // Blur the button when disabled
    }
});

// Enable the 'Agree and Continue' button in the modal only when the checkbox inside the modal is checked
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

// Close the modal and enable the "Create Account" button when "Agree" is clicked
document.getElementById('agreeButton').addEventListener('click', function() {
    // Close the modal
    $('#termsModal').modal('hide');
    
    // Enable the sign-up button
    document.getElementById('bt').disabled = false;
    document.getElementById('bt').style.opacity = 1; // Make the button fully visible
});
