
/*//start login javascript
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
} //end login javascript */

/*function validateForm(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error message
    errorMessage.textContent = '';

    // Check if username and password are provided
    if (!username || !password) {
        errorMessage.textContent = 'Please enter both Username and Password.';
        event.preventDefault();  // Prevent form submission if validation fails
        return;
    }
}

// Add event listener to the form submit event
document.getElementById('loginForm').addEventListener('submit', validateForm);*/

function validateForm(event) {
    const organization = document.getElementById('organization')?.value;
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessage.textContent = '';

    // Check for organization login
    if (organization !== undefined) {
        // Validate organization form
        if (!organization && !password) {
            errorMessage.textContent = 'Please enter your Organization Number and Password.';
            event.preventDefault();  // Prevent form submission if validation fails
            return;
        }

        if (!organization) {
            errorMessage.textContent = 'Please enter your Organization Number.';
            event.preventDefault();
            return;
        }

        if (!password) {
            errorMessage.textContent = 'Please enter your Password.';
            event.preventDefault();
            return;
        }
    } 
    // Check for user login
    else if (username !== undefined) {
        // Validate user form
        if (!username && !password) {
            errorMessage.textContent = 'Please enter your Username and Password.';
            event.preventDefault();
            return;
        }

        if (!username) {
            errorMessage.textContent = 'Please enter your Username.';
            event.preventDefault();
            return;
        }

        if (!password) {
            errorMessage.textContent = 'Please enter your Password.';
            event.preventDefault();
            return;
        }
    }

    // If validation passes, display a hello message
    alert('Hello!');
}

// Add event listener to the form submit event for both forms
document.getElementById('loginForm').addEventListener('submit', validateForm);
document.getElementById('orgLoginForm')?.addEventListener('submit', validateForm);  // Assuming there's another form for organization

