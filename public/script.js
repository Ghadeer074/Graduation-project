//start login javascript
function validateForm() {
    const organization = document.getElementById('organization')?.value;
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error message
    errorMessage.textContent = '';

    if (organization !== undefined) {
        // التحقق من الصفحة الأولى
        if (!organization && !password) {
            errorMessage.textContent = 'Please enter your Organization Number and Password.';
            return;
        }

        if (!organization) {
            errorMessage.textContent = 'Please enter your Organization Number.';
            return;
        }

        if (!password) {
            errorMessage.textContent = 'Please enter your Password.';
            return;
        }
    } else if (username !== undefined) {
        // التحقق من الصفحة الثانية
        if (!username && !password) {
            errorMessage.textContent = 'Please enter your Username and Password.';
            return;
        }

        if (!username) {
            errorMessage.textContent = 'Please enter your Username.';
            return;
        }

        if (!password) {
            errorMessage.textContent = 'Please enter your Password.';
            return;
        }
    }

    // If validation passes, display a hello message
    alert('Hello!');
} //end login javascript 

