// Frontend JavaScript for Sign-Up Validation and Terms Modal Interaction

// Function to handle the form validation for the sign-up page
function signUp() {
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var dob = document.getElementById('dob');
    var nationality = document.getElementById('nationality');
    var province = document.getElementById('province');
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('password');
    var msg = document.getElementById('msg');
    let isValid = true;  // Flag to track validation status

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

    if (nationality.value.trim() === '') {
        setStyleAndMsg(nationality, "You must select your nationality.");
        isValid = false;
    }

    if (province.value.trim() === '') {
        setStyleAndMsg(province, "You must enter your province.");
        isValid = false;
    } else if (!isAlpha(province.value)) {
        setStyleAndMsg(province, "Province must contain letters.");
        isValid = false;
    }

    if (username.value.trim() === '') {
        setStyleAndMsg(username, "You must enter a username.");
        isValid = false;
    } else if (!isAlphaNumeric(username.value)) {
        setStyleAndMsg(username, "Username must contain only alphanumeric characters.");
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
        setStyleAndMsg(password, "Password must be between 8 and 12 characters long, have at least one uppercase letter, one lowercase letter, and must have digits.");
        isValid = false;
    }

    return isValid;  // If all checks pass, the form can be submitted
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

function resetStyles() {
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
    return value.length >= 8 && value.length <= 12 &&
        /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
}


// country dropdown list
document.addEventListener('DOMContentLoaded', function() {
    const countryDropdown = document.getElementById('nationality');
    
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.text = country.name.common;
                countryDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));
});


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
