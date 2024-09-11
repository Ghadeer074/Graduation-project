//<<<<<<< HEAD
// JavaScript front-end codes here 
document.querySelector('#content').innerHTML = `<button id="sendData">Send Data</button>`;

document.querySelector('#sendData').addEventListener('click', () => {
    fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Sample', value: 42 })
    })
    .then(response => response.json())
    .then(data => console.log('Data sent to server:', data))
    .catch(error => console.error('Error:', error));
});

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

//>>>>>>> 77beb6360bc88c6502e16e001e556b0b9c5a2f03
