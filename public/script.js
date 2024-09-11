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
