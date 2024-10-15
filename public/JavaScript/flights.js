document.addEventListener('DOMContentLoaded', () => {
    const addFlightBtn = document.getElementById('addFlightBtn');
    const addFlightPopup = document.getElementById('addFlightPopup');
    const closeAddPopup = document.getElementById('closeAddPopup');
    const flightForm = document.getElementById('flightForm');
    const editFlightPopup = document.getElementById('editFlightPopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const editFlightForm = document.getElementById('editFlightForm');
    const deleteFlightPopup = document.getElementById('deleteFlightPopup');
    const closeDeletePopup = document.getElementById('closeDeletePopup');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    let flightToDelete = null;

    // Popup handling
    addFlightBtn.addEventListener('click', () => addFlightPopup.style.display = 'block');
    closeAddPopup.addEventListener('click', () => addFlightPopup.style.display = 'none');
    closeEditPopup.addEventListener('click', () => editFlightPopup.style.display = 'none');
    closeDeletePopup.addEventListener('click', () => deleteFlightPopup.style.display = 'none');
    cancelDeleteBtn.addEventListener('click', () => deleteFlightPopup.style.display = 'none');

    // Initialize flatpickr for date and time inputs
    flatpickr("#date", { dateFormat: "Y-m-d" });
    flatpickr("#time", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
    flatpickr("#editDate", { dateFormat: "Y-m-d" });
    flatpickr("#editTime", { enableTime: true, noCalendar: true, dateFormat: "H:i" });

    // Add new flight
    flightForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(flightForm);
        const flightData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/flights/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flightData)
            });

            if (response.ok) {
                addFlightPopup.style.display = 'none';
                flightForm.reset();
                location.reload(); // Refresh the page to show the new flight
            } else {
                const error = await response.json();
                alert(`Failed to add flight: ${error.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the flight');
        }
    });

    // Edit flight
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const flightId = e.target.dataset.id;
            try {
                const response = await fetch(`/flights/${flightId}`);
                if (response.ok) {
                    const flight = await response.json();
                    document.getElementById('editFlightNumber').value = flight.flightNumber;
                    document.getElementById('editDate').value = flight.date.substring(0, 10);
                    document.getElementById('editTime').value = flight.time;
                    document.getElementById('editDestination').value = flight.destination;
                    editFlightForm.dataset.id = flightId;
                    editFlightPopup.style.display = 'block';
                } else {
                    alert('Failed to fetch flight details');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching flight details');
            }
        });
    });

    editFlightForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const flightId = e.target.dataset.id;
        const formData = new FormData(editFlightForm);
        const flightData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/flights/edit/${flightId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flightData)
            });

            if (response.ok) {
                editFlightPopup.style.display = 'none';
                location.reload(); // Refresh the page to show the updated flight
            } else {
                const error = await response.json();
                alert(`Failed to update flight: ${error.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the flight');
        }
    });

    // Delete flight
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            flightToDelete = e.target.dataset.id;
            deleteFlightPopup.style.display = 'block';
        });
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        if (flightToDelete) {
            try {
                const response = await fetch(`/flights/delete/${flightToDelete}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    deleteFlightPopup.style.display = 'none';
                    location.reload(); // Refresh the page to remove the deleted flight
                } else {
                    const error = await response.json();
                    alert(`Failed to delete flight: ${error.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the flight');
            }
        }
        deleteFlightPopup.style.display = 'none';
    });
});