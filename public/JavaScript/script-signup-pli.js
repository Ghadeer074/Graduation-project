function signUp(){
    var firstName = document.getElementById('first');
    var lastName = document.getElementById('last');
    var nationality= document.getElementById('nat');
    var province = document.getElementById('prov');
    var username = document.getElementById('un');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('pass');
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

    if (nationality.value.trim().isEmpty()) {
        setStyleAndMsg(nationality, "You must enter your nationality.");
    } else if (!isAlpha(nationality.value)) {
        setStyleAndMsg(nationality, "nationality must contain letters.");
    }

    if (province.value.trim().isEmpty()) {
        setStyleAndMsg(province, "You must enter your province.");
    } else if (!isAlpha(province.value)) {
        setStyleAndMsg(province, "province must contain letters.");
    }

    if (username.value.trim().isEmpty()) {
        setStyleAndMsg(username, "You must enter a username.");
    } else if (!isAlphaNumeric(username.value)) {
        setStyleAndMsg(username, "Username must contain only alphanumeric characters.");
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