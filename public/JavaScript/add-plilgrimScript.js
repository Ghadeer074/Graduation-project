const nameInput = document.getElementById('name');

nameInput.addEventListener('input', function(e) {
    const regex = /[^A-Za-z؀-ۿ]/g;
    this.value = this.value.replace(regex, '');
});



const passportInput = document.getElementById('passportNumber');

passportInput.addEventListener('input', function(e) {
    let value = this.value.toUpperCase();
    let letterPart = value.match(/^[A-Z]{0,3}/)[0];
    let numberPart = value.slice(letterPart.length).replace(/\D/g, '');
    this.value = letterPart + numberPart;

    // Custom validation
    if (/^[A-Z]{0,3}[0-9]+$/.test(this.value)) {
        this.setCustomValidity('');
    } else {
        this.setCustomValidity('Please enter a valid passport number (up to 3 letters followed by numbers).');
    }
});

const flightNumberInput = document.getElementById('flightNumber');


// Sample data for countries and provinces
const countriesData = {
    "US": {
        name: "United States",
        provinces: [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
            "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ]
    },
    "SA": {
        name: "Saudi Arabia",
        provinces: [
            "Riyadh", "Makkah", "Madinah", "Eastern Province", "Asir", "Tabuk", "Hail", "Northern Borders",
            "Jazan", "Najran", "Al Bahah", "Al Jawf", "Al Qassim"
        ]
    },
    "AE": {
        name: "United Arab Emirates",
        provinces: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"]
    },
    "GB": {
        name: "United Kingdom",
        provinces: [
            "England", "Scotland", "Wales", "Northern Ireland"
        ]
    },
    "CA": {
        name: "Canada",
        provinces: [
            "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario",
            "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"
        ]
    },
    "AU": {
        name: "Australia",
        provinces: [
            "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania",
            "Australian Capital Territory", "Northern Territory"
        ]
    },
    "DE": {
        name: "Germany",
        provinces: [
            "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony",
            "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony",
            "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
        ]
    },
    "FR": {
        name: "France",
        provinces: [
            "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica",
            "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie",
            "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
        ]
    },
    "JP": {
        name: "Japan",
        provinces: [
            "Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki", "Tochigi", "Gunma",
            "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano",
            "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama",
            "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka",
            "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa"
        ]
    },
    "BR": {
        name: "Brazil",
        provinces: [
            "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso",
            "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
            "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
            "Distrito Federal"
        ]
    },
    "IN": {
        name: "India",
        provinces: [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
            "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
        ]
    },
    "CN": {
        name: "China",
        provinces: [
            "Anhui", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei",
            "Hunan", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai", "Shaanxi", "Shandong", "Shanxi", "Sichuan",
            "Yunnan", "Zhejiang", "Guangxi", "Inner Mongolia", "Ningxia", "Xinjiang", "Tibet"
        ]
    },
    "RU": {
        name: "Russia",
        provinces: [
            "Adygea", "Altai", "Bashkortostan", "Buryatia", "Dagestan", "Ingushetia", "Kabardino-Balkaria", "Kalmykia",
            "Karachay-Cherkessia", "Karelia", "Komi", "Mari El", "Mordovia", "North Ossetia-Alania", "Sakha", "Tatarstan",
            "Tuva", "Udmurtia", "Khakassia", "Chechnya", "Chuvashia", "Altai Krai", "Krasnodar Krai", "Krasnoyarsk Krai",
            "Primorsky Krai", "Stavropol Krai", "Khabarovsk Krai", "Amur Oblast", "Arkhangelsk Oblast", "Astrakhan Oblast",
            "Belgorod Oblast", "Bryansk Oblast", "Vladimir Oblast", "Volgograd Oblast", "Vologda Oblast", "Voronezh Oblast",
            "Ivanovo Oblast", "Irkutsk Oblast", "Kaliningrad Oblast", "Kaluga Oblast", "Kamchatka Krai", "Kemerovo Oblast",
            "Kirov Oblast", "Kostroma Oblast", "Kurgan Oblast", "Kursk Oblast", "Leningrad Oblast", "Lipetsk Oblast",
            "Magadan Oblast", "Moscow Oblast", "Murmansk Oblast", "Nizhny Novgorod Oblast", "Novgorod Oblast",
            "Novosibirsk Oblast", "Omsk Oblast", "Orenburg Oblast", "Oryol Oblast", "Penza Oblast", "Perm Krai",
            "Pskov Oblast", "Rostov Oblast", "Ryazan Oblast", "Samara Oblast", "Saratov Oblast", "Sakhalin Oblast",
            "Sverdlovsk Oblast", "Smolensk Oblast", "Tambov Oblast", "Tver Oblast", "Tomsk Oblast", "Tula Oblast",
            "Tyumen Oblast", "Ulyanovsk Oblast", "Chelyabinsk Oblast", "Zabaykalsky Krai", "Yaroslavl Oblast",
            "Moscow", "Saint Petersburg", "Sevastopol", "Jewish Autonomous Oblast", "Nenets Autonomous Okrug",
            "Khanty-Mansi Autonomous Okrug", "Chukotka Autonomous Okrug", "Yamalo-Nenets Autonomous Okrug"
        ]
    }
};

// Populate country dropdown
function populateCountryDropdown() {
    const nationalitySelect = document.getElementById('nationality');
    nationalitySelect.innerHTML = '<option value="">Select a country</option>';
    Object.entries(countriesData).forEach(([code, country]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = country.name;
        nationalitySelect.appendChild(option);
    });
}

// Populate province dropdown based on selected country
function populateProvinceDropdown(countryCode) {
    const provinceSelect = document.getElementById('province');
    provinceSelect.innerHTML = '<option value="">Select a province</option>';
    if (countryCode && countriesData[countryCode]) {
        countriesData[countryCode].provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    }
}

// Handle country selection
document.getElementById('nationality').addEventListener('change', (e) => {
    const selectedCountry = e.target.value;
    populateProvinceDropdown(selectedCountry);
});

// Initialize Flatpickr for date inputs
flatpickr("#dateOfBirth", {
    dateFormat: "m/d/Y",
    maxDate: "today"
});

flatpickr("#dateAndTime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
});

// Form submission
document.getElementById('pilgrimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const pilgrimData = Object.fromEntries(formData.entries());

    // Log form data to console (for demonstration purposes)
    console.log('Form submitted with data:', pilgrimData);

    // Show success message
    alert('Pilgrim added successfully!');

    // Reset form after submission
    this.reset();

    // Reset province dropdown
    document.getElementById('province').innerHTML = '<option value="">Select a province</option>';
});

// Initial load of countries
populateCountryDropdown();

