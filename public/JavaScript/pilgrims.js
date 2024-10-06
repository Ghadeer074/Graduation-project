document.addEventListener('DOMContentLoaded', () => {
    const addPilgrimBtn = document.getElementById('addPilgrimBtn');
    const addPilgrimPopup = document.getElementById('addPilgrimPopup');
    const closeAddPopup = document.getElementById('closeAddPopup');
    const nameInput = document.getElementById('name');
    const passportInput = document.getElementById('passportNumber');
    const nationalitySelect = document.getElementById('nationality');
    const provinceSelect = document.getElementById('province');
    const pilgrimForm = document.getElementById('pilgrimForm');
    const editPilgrimPopup = document.getElementById('editPilgrimPopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const editPilgrimForm = document.getElementById('editPilgrimForm');
    const deletePilgrimPopup = document.getElementById('deletePilgrimPopup');
    const closeDeletePopup = document.getElementById('closeDeletePopup');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // Popup handling
    addPilgrimBtn.addEventListener('click', () => {
        addPilgrimPopup.style.display = 'block';
    });

    closeAddPopup.addEventListener('click', () => {
        addPilgrimPopup.style.display = 'none';
    });

    closeEditPopup.addEventListener('click', () => {
        editPilgrimPopup.style.display = 'none';
    });

    closeDeletePopup.addEventListener('click', () => {
        deletePilgrimPopup.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deletePilgrimPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === addPilgrimPopup) {
            addPilgrimPopup.style.display = 'none';
        }
        if (event.target === editPilgrimPopup) {
            editPilgrimPopup.style.display = 'none';
        }
        if (event.target === deletePilgrimPopup) {
            deletePilgrimPopup.style.display = 'none';
        }
    });

    // Name input validation
    nameInput.addEventListener('input', function(e) {
        const regex = /[^A-Za-z؀-ۿ]/g;
        this.value = this.value.replace(regex, '');
    });

    // Passport input validation
    passportInput.addEventListener('input', function(e) {
        let value = this.value.toUpperCase();
        let letterPart = value.match(/^[A-Z]{0,3}/)[0];
        let numberPart = value.slice(letterPart.length).replace(/\D/g, '');
        this.value = letterPart + numberPart;

        if (/^[A-Z]{0,3}[0-9]+$/.test(this.value)) {
            this.setCustomValidity('');
        } else {
            this.setCustomValidity('Please enter a valid passport number (up to 3 letters followed by numbers).');
        }
    });

    // Nationality and Province handling
    const countriesData = {
        "US": {
            name: "United States",
            provinces: ["Alabama", "Alaska", "Arizona", /* ... other US states ... */]
        },
        "SA": {
            name: "Saudi Arabia",
            provinces: ["Riyadh", "Makkah", "Madinah", /* ... other Saudi provinces ... */]
        },
        // ... Add other countries here ...
    };

    function populateCountryDropdown(selectElement) {
        selectElement.innerHTML = '<option value="">Select a country</option>';
        Object.entries(countriesData).forEach(([code, country]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = country.name;
            selectElement.appendChild(option);
        });
    }

    function populateProvinceDropdown(countryCode, selectElement) {
        selectElement.innerHTML = '<option value="">Select a province</option>';
        if (countryCode && countriesData[countryCode]) {
            countriesData[countryCode].provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                selectElement.appendChild(option);
            });
        }
    }

    nationalitySelect.addEventListener('change', (e) => {
        const selectedCountry = e.target.value;
        populateProvinceDropdown(selectedCountry, provinceSelect);
    });

    // Initialize country dropdowns
    populateCountryDropdown(nationalitySelect);
    populateCountryDropdown(document.getElementById('editNationality'));

    // Initialize flatpickr for date fields
    flatpickr('#dateOfBirth', {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });
    flatpickr('#dateAndTime', {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today"
    });
    flatpickr('#editDateOfBirth', {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });
    flatpickr('#editDateAndTime', {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today"
    });

    // Form submission for adding a pilgrim
    pilgrimForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/pilgrims/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to add pilgrim');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
        this.reset();
        provinceSelect.innerHTML = '<option value="">Select a province</option>';
        addPilgrimPopup.style.display = 'none';
    });

    // Edit pilgrim functionality
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const pilgrimId = e.target.dataset.id;
            populateEditForm(pilgrimId);
            editPilgrimPopup.style.display = 'block';
        });
    });

    async function populateEditForm(pilgrimId) {
        try {
            const response = await fetch(`/pilgrims/${pilgrimId}`);
            const pilgrim = await response.json();
            
            document.getElementById('editPassportNumber').value = pilgrim.passportNumber;
            document.getElementById('editName').value = pilgrim.name;
            document.getElementById('editDateOfBirth').value = pilgrim.dateOfBirth.substring(0, 10);
            document.getElementById('editNationality').value = pilgrim.nationality;
            populateProvinceDropdown(pilgrim.nationality, document.getElementById('editProvince'));
            document.getElementById('editProvince').value = pilgrim.province;
            document.getElementById('editFlightNumber').value = pilgrim.flightNumber;
            document.getElementById('editDateAndTime').value = pilgrim.dateAndTime;
            document.getElementById('editDestination').value = pilgrim.destination;
            
            editPilgrimForm.dataset.id = pilgrimId;
        } catch (error) {
            console.error('Error fetching pilgrim data:', error);
        }
    }

    editPilgrimForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pilgrimId = e.target.dataset.id;
        const formData = new FormData(editPilgrimForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/pilgrims/edit/${pilgrimId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to update pilgrim');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Delete pilgrim functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    let pilgrimToDelete = null;

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            pilgrimToDelete = e.target.dataset.id;
            deletePilgrimPopup.style.display = 'block';
        });
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        if (pilgrimToDelete) {
            try {
                const response = await fetch(`/pilgrims/delete/${pilgrimToDelete}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Failed to delete pilgrim');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        deletePilgrimPopup.style.display = 'none';
    });
});