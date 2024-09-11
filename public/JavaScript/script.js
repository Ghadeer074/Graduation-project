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

// Handle GET request via AJAX
document.getElementById('getDataBtn').addEventListener('click', function() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = data.message;
        })
        .catch(error => console.error('Error:', error));
});

// Handle POST request via AJAX
document.getElementById('sendDataBtn').addEventListener('click', function() {
    const postData = {
        name: 'John Doe',
        email: 'john@example.com'
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message + ': ' + JSON.stringify(data.data);
    })
    .catch(error => console.error('Error:', error));
});
