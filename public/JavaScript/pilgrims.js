document.addEventListener('DOMContentLoaded', () => {
    // Get all DOM elements
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
    const editNationalitySelect = document.getElementById('editNationality');
    const editProvinceSelect = document.getElementById('editProvince');

    // Popup handling
    addPilgrimBtn.addEventListener('click', () => {
        addPilgrimPopup.style.display = 'block';
    });

    closeAddPopup.addEventListener('click', () => {
        addPilgrimPopup.style.display = 'none';
        pilgrimForm.reset();
        provinceSelect.innerHTML = '<option value="">Select a province</option>';
    });

    closeEditPopup.addEventListener('click', () => {
        editPilgrimPopup.style.display = 'none';
        editPilgrimForm.reset();
        editProvinceSelect.innerHTML = '<option value="">Select a province</option>';
    });

    closeDeletePopup.addEventListener('click', () => {
        deletePilgrimPopup.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deletePilgrimPopup.style.display = 'none';
    });

    // Close popups when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === addPilgrimPopup) {
            addPilgrimPopup.style.display = 'none';
            pilgrimForm.reset();
            provinceSelect.innerHTML = '<option value="">Select a province</option>';
        }
        if (event.target === editPilgrimPopup) {
            editPilgrimPopup.style.display = 'none';
            editPilgrimForm.reset();
            editProvinceSelect.innerHTML = '<option value="">Select a province</option>';
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

    // Countries and Provinces data
    const countriesData = {
        "Saudi": {
            name: "Saudi Arabia",
            provinces: [
                "Riyadh",
                "Makkah",
                "Madinah",
                "Eastern Province",
                "Tabuk",
                "Hail",
                "Northern Borders",
                "Al Jaef",
                "Al Kharj",
                "Asir",
                "Najran",
                "Qassim",
                "Jizan",
                "Al Baha",
                "Al Qunfudhah",
                "Taif"
            ]
        },
        "Emirati": {
            name: "United Arab Emirates",
            provinces: [
                "Abu Dhabi",
                "Dubai",
                "Sharjah",
                "Ajman",
                "Umm Al-Quwain",
                "Fujairah",
                "Ras Al Khaimah"
            ]
        },
        "Oman": {
            name: "Oman",
            provinces: [
                "Muscat",
                "Dhofar",
                "Musandam",
                "Al Dakhiliyah",
                "Ash Sharqiyah",
                "Al Dhahirah",
                "Al Batinah",
                "Al Sharqiyah North",
                "Al Sharqiyah South",
                "Al Wusta",
                "Al Buraimi",
                "Ad Dakhiliyah"
            ]
        },
        "Yemen": {
            name: "Yemen",
            provinces: [
                "Aden",
                "Taiz",
                "Hadhramaut",
                "Al Mahwit",
                "Ibb",
                "Saada",
                "Raymah",
                "Al Hudaydah",
                "Abyan",
                "Lahij",
                "Shabwa",
                "Al Bayda",
                "Al Mahrah",
                "Al Jawf",
                "Marib",
                "Dhamar",
                "Al Dhalee",
                "Socotra",
                "Hajjah",
                "Sanaa"
            ]
        },
        "India": {
            name: "India",
            provinces: [
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Gujarat",
                "Haryana",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Rajasthan",
                "Tamil Nadu",
                "Telangana",
                "Odisha",
                "West Bengal",
                "Uttar Pradesh",
                "Punjab",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Chhattisgarh",
                "Uttarakhand",
                "Goa",
                "Delhi",
                "Puducherry",
                "Chandigarh",
                "Andaman and Nicobar Islands",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Lakshadweep",
                "Sikkim",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Tripura"
            ]
        },
        "Bangladeshi": {
            name: "Bangladesh",
            provinces: [
                "Dhaka",
                "Chittagong",
                "Khulna",
                "Rajshahi",
                "Sylhet",
                "Barisal",
                "Mymensingh",
                "Rangpur",
                "Comilla",
                "Narayanganj",
                "Gazipur",
                "Bogra",
                "Kushtia",
                "Jessore",
                "Dinajpur"
            ]
        },
        "Egyptian": {
            name: "Egypt",
            provinces: [
                "Cairo",
                "Giza",
                "Alexandria",
                "Dakahlia",
                "Beheira",
                "Sharqia",
                "Gharbia",
                "Menoufia",
                "Qalyubia",
                "Kafr El Sheikh",
                "Fayoum",
                "Beni Suef",
                "Minya",
                "Assiut",
                "Sohag",
                "Qena",
                "Aswan",
                "Luxor",
                "Red Sea",
                "Matruh",
                "New Valley",
                "North Sinai",
                "South Sinai",
                "Damietta",
                "Port Said",
                "Ismailia",
                "Suez"
            ]
        },
        "Jordanian": {
            name: "Jordan",
            provinces: [
                "Amman",
                "Balqa",
                "Zarqa",
                "Madaba",
                "Irbid",
                "Mafraq",
                "Jerash",
                "Ajloun",
                "Karak",
                "Tafilah",
                "Maan",
                "Aqaba"
            ]
        },
        "Lebanese": {
            name: "Lebanon",
            provinces: [
                "Beirut",
                "Mount Lebanon",
                "North Lebanon",
                "South Lebanon",
                "Nabatieh",
                "Bekaa",
                "Akkar",
                "Jbeil",
                "Baalbek-Hermel",
                "Keserwan-Jbeil",
                "Chouf",
                "Zahle"
            ]
        },
        "Syrian": {
            name: "Syria",
            provinces: [
                "Damascus",
                "Aleppo",
                "Homs",
                "Latakia",
                "Tartus",
                "Idlib",
                "Daraa",
                "As-Suwayda",
                "Al-Hasakah",
                "Raqqa",
                "Deir ez-Zor",
                "Quneitra",
                "Hama",
                "Rural Damascus"
            ]
        },
        "Qatari": {
            name: "Qatar",
            provinces: [
                "Doha",
                "Al Rayyan",
                "Al Wakrah",
                "Al Khor",
                "Al Daayen",
                "Umm Salal",
                "Al Sheehaniya",
                "Madinat ash Shamal"
            ]
        },
        "Bahraini": {
            name: "Bahrain",
            provinces: [
                "Capital",
                "Muharraq",
                "Southern",
                "Northern",
                "Central"
            ]
        },
        "Moroccan": {
            name: "Morocco",
            provinces: [
                "Tanger-Tetouan-Al Hoceima",
                "Eastern",
                "Fes-Meknes",
                "Rabat-Salé-Kénitra",
                "Béni Mellal-Khénifra",
                "Casablanca-Settat",
                "Marrakech-Safi",
                "Draa-Tafilalet",
                "Souss-Massa",
                "Guelmim-Oued Noun",
                "Laâyoune-Sakia El Hamra",
                "Dakhla-Oued Ed-Dahab"
            ]
        },
        "Tunisian": {
            name: "Tunisia",
            provinces: [
                "Tunis",
                "Ariana",
                "Béja",
                "Ben Arous",
                "Bizerte",
                "Kasserine",
                "Kairouan",
                "Sfax",
                "Sousse",
                "Gabès",
                "Medenine",
                "Tozeur",
                "Jendouba",
                "Mahdia",
                "Siliana",
                "Sidi Bouzid",
                "Nabeul",
                "Zaghouan",
                "Monastir",
                "La Manouba",
                "Gafsa",
                "Tataouine",
                "Kebili"
            ]
        },
        "Algerian": {
            name: "Algeria",
            provinces: [
                "Algiers",
                "Oran",
                "Constantine",
                "Annaba",
                "Blida",
                "Bordj Bou Arréridj",
                "Batna",
                "Sétif",
                "Tizi Ouzou",
                "Tlemcen",
                "Béjaïa",
                "Skikda",
                "Chlef",
                "Médéa",
                "Aïn Defla",
                "Saida",
                "Guelma",
                "El Oued",
                "Tébessa",
                "Biskra",
                "Khenchela",
                "Souk Ahras",
                "Laghouat",
                "Relizane",
                "Tipaza",
                "MSila",
                "Naama",
                "Ain Temouchent"
            ]
        },
        "Sudanese": {
            name: "Sudan",
            provinces: [
                "Khartoum",
                "North Kordofan",
                "South Kordofan",
                "Gedaref",
                "Sennar",
                "Blue Nile",
                "White Nile",
                "River Nile",
                "Northern",
                "Red Sea",
                "Al Jazirah",
                "South Darfur",
                "West Darfur",
                "North Darfur",
                "East Darfur",
                "Kassala",
                "West Kordofan",
                "Central Darfur",
                "Abyei Area"
            ]
        },
        "Pakistani": {
        name: "Pakistan",
        provinces: [
            "Azad Kashmir",
            "Balochistan",
            "Gilgit-Baltistan",
            "Islamabad Capital Territory",
            "Khyber Pakhtunkhwa",
            "Punjab",
            "Sindh",
            "Bahawalpur",
            "Dera Ghazi Khan",
            "Faisalabad",
            "Gujranwala",
            "Gujrat",
            "Lahore",
            "Multan",
            "Rawalpindi",
            "Sahiwal",
            "Sargodha",
            "Sialkot",
            "Karachi",
            "Hyderabad",
            "Sukkur",
            "Larkana",
            "Peshawar",
            "Mardan",
            "Quetta"
        ]
    },
    "Indonesian": {
        name: "Indonesia",
        provinces: [
            "Aceh",
            "Bali",
            "Bangka Belitung Islands",
            "Banten",
            "Bengkulu",
            "Central Java",
            "Central Kalimantan",
            "Central Sulawesi",
            "East Java",
            "East Kalimantan",
            "East Nusa Tenggara",
            "Gorontalo",
            "Jakarta",
            "Jambi",
            "Lampung",
            "Maluku",
            "North Kalimantan",
            "North Maluku",
            "North Sulawesi",
            "North Sumatra",
            "Papua",
            "Riau",
            "Riau Islands",
            "South Kalimantan",
            "South Sulawesi",
            "South Sumatra",
            "Southeast Sulawesi",
            "West Java",
            "West Kalimantan",
            "West Nusa Tenggara",
            "West Papua",
            "West Sulawesi",
            "West Sumatra",
            "Yogyakarta"
        ]
    },
    "Malaysian": {
        name: "Malaysia",
        provinces: [
            "Johor",
            "Kedah",
            "Kelantan",
            "Kuala Lumpur",
            "Labuan",
            "Malacca",
            "Negeri Sembilan",
            "Pahang",
            "Penang",
            "Perak",
            "Perlis",
            "Putrajaya",
            "Sabah",
            "Sarawak",
            "Selangor",
            "Terengganu"
        ]
    },
    "Turkish": {
        name: "Turkey",
        provinces: [
            "Adana",
            "Adiyaman",
            "Afyonkarahisar",
            "Agri",
            "Aksaray",
            "Amasya",
            "Ankara",
            "Antalya",
            "Ardahan",
            "Artvin",
            "Aydin",
            "Balikesir",
            "Bartin",
            "Batman",
            "Bayburt",
            "Bilecik",
            "Bingol",
            "Bitlis",
            "Bolu",
            "Burdur",
            "Bursa",
            "Canakkale",
            "Cankiri",
            "Corum",
            "Denizli",
            "Diyarbakir",
            "Duzce",
            "Edirne",
            "Elazig",
            "Erzincan",
            "Erzurum",
            "Eskisehir",
            "Gaziantep",
            "Giresun",
            "Gumushane",
            "Hakkari",
            "Hatay",
            "Igdir",
            "Isparta",
            "Istanbul",
            "Izmir",
            "Kahramanmaras",
            "Karabuk",
            "Karaman",
            "Kars",
            "Kastamonu",
            "Kayseri",
            "Kilis",
            "Kirikkale",
            "Kirklareli",
            "Kirsehir",
            "Kocaeli",
            "Konya",
            "Kutahya",
            "Malatya",
            "Manisa",
            "Mardin",
            "Mersin",
            "Mugla",
            "Mus",
            "Nevsehir",
            "Nigde",
            "Ordu",
            "Osmaniye",
            "Rize",
            "Sakarya",
            "Samsun",
            "Sanliurfa",
            "Siirt",
            "Sinop",
            "Sirnak",
            "Sivas",
            "Tekirdag",
            "Tokat",
            "Trabzon",
            "Tunceli",
            "Usak",
            "Van",
            "Yalova",
            "Yozgat",
            "Zonguldak"
        ]
    },
    "Iraqi": {
        name: "Iraq",
        provinces: [
            "Al Anbar",
            "Al Muthanna",
            "Al-Qādisiyyah",
            "Babil",
            "Baghdad",
            "Basra",
            "Dhi Qar",
            "Diyala",
            "Duhok",
            "Erbil",
            "Halabja",
            "Karbala",
            "Kirkuk",
            "Maysan",
            "Najaf",
            "Ninawa",
            "Salah Al-Din",
            "Sulaymaniyah",
            "Wasit"
        ]
    },
    "Kuwaiti": {
        name: "Kuwait",
        provinces: [
            "Al Ahmadi",
            "Al Farwaniyah",
            "Al Jahra",
            "Capital",
            "Hawally",
            "Mubarak Al-Kabeer"
        ]
    },
    "Afghan": {
        name: "Afghanistan",
        provinces: [
            "Badakhshan",
            "Badghis",
            "Baghlan",
            "Balkh",
            "Bamyan",
            "Daykundi",
            "Farah",
            "Faryab",
            "Ghazni",
            "Ghor",
            "Helmand",
            "Herat",
            "Jowzjan",
            "Kabul",
            "Kandahar",
            "Kapisa",
            "Khost",
            "Kunar",
            "Kunduz",
            "Laghman",
            "Logar",
            "Nangarhar",
            "Nimruz",
            "Nuristan",
            "Paktia",
            "Paktika",
            "Panjshir",
            "Parwan",
            "Samangan",
            "Sar-e Pul",
            "Takhar",
            "Uruzgan",
            "Wardak",
            "Zabul"
        ]
    },
    "Nigerian": {
        name: "Nigeria",
        provinces: [
            "Abia",
            "Adamawa",
            "Akwa Ibom",
            "Anambra",
            "Bauchi",
            "Bayelsa",
            "Benue",
            "Borno",
            "Cross River",
            "Delta",
            "Ebonyi",
            "Edo",
            "Ekiti",
            "Enugu",
            "Federal Capital Territory",
            "Gombe",
            "Imo",
            "Jigawa",
            "Kaduna",
            "Kano",
            "Katsina",
            "Kebbi",
            "Kogi",
            "Kwara",
            "Lagos",
            "Nasarawa",
            "Niger",
            "Ogun",
            "Ondo",
            "Osun",
            "Oyo",
            "Plateau",
            "Rivers",
            "Sokoto",
            "Taraba",
            "Yobe",
            "Zamfara"
        ]
    },
    "Somali": {
        name: "Somalia",
        provinces: [
            "Awdal",
            "Bakool",
            "Banaadir",
            "Bari",
            "Bay",
            "Galguduud",
            "Gedo",
            "Hiiraan",
            "Lower Juba",
            "Lower Shabelle",
            "Middle Juba",
            "Middle Shabelle",
            "Mudug",
            "Nugal",
            "Sanaag",
            "Sool",
            "Togdheer",
            "Woqooyi Galbeed"
        ]
    },
    "Ethiopian": {
        name: "Ethiopia",
        provinces: [
            "Addis Ababa",
            "Afar",
            "Amhara",
            "Benishangul-Gumuz",
            "Dire Dawa",
            "Gambela",
            "Harari",
            "Oromia",
            "Sidama",
            "Somali",
            "South West Ethiopia Peoples",
            "Southern Nations, Nationalities and Peoples",
            "Tigray"
        ]
    },
    "Malian": {
        name: "Mali",
        provinces: [
            "Bamako",
            "Gao",
            "Kayes",
            "Kidal",
            "Koulikoro",
            "Mopti",
            "Segou",
            "Sikasso",
            "Tombouctou"
        ]
    },
    "Senegalese": {
        name: "Senegal",
        provinces: [
            "Dakar",
            "Diourbel",
            "Fatick",
            "Kaffrine",
            "Kaolack",
            "Kedougou",
            "Kolda",
            "Louga",
            "Matam",
            "Saint-Louis",
            "Sedhiou",
            "Tambacounda",
            "Thies",
            "Ziguinchor"
        ]
    },
    "Chinese": {
        name: "China",
        provinces: [
            "Anhui",
            "Beijing",
            "Chongqing",
            "Fujian",
            "Gansu",
            "Guangdong",
            "Guangxi",
            "Guizhou",
            "Hainan",
            "Hebei",
            "Heilongjiang",
            "Henan",
            "Hong Kong",
            "Hubei",
            "Hunan",
            "Inner Mongolia",
            "Jiangsu",
            "Jiangxi",
            "Jilin",
            "Liaoning",
            "Macau",
            "Ningxia",
            "Qinghai",
            "Shaanxi",
            "Shandong",
            "Shanghai",
            "Shanxi",
            "Sichuan",
            "Taiwan",
            "Tianjin",
            "Tibet",
            "Xinjiang",
            "Yunnan",
            "Zhejiang"
        ]
    },
    "Russian": {
        name: "Russia",
        provinces: [
            "Adygea",
            "Altai Krai",
            "Altai Republic",
            "Amur Oblast",
            "Arkhangelsk Oblast",
            "Astrakhan Oblast",
            "Bashkortostan",
            "Belgorod Oblast",
            "Bryansk Oblast",
            "Buryatia",
            "Chechnya",
            "Chelyabinsk Oblast",
            "Chukotka",
            "Chuvashia",
            "Dagestan",
            "Ingushetia",
            "Irkutsk Oblast",
            "Ivanovo Oblast",
            "Jewish Autonomous Oblast",
            "Kabardino-Balkaria",
            "Kaliningrad Oblast",
            "Kalmykia",
            "Kaluga Oblast",
            "Kamchatka Krai",
            "Karachay-Cherkessia",
            "Karelia",
            "Kemerovo Oblast",
            "Khabarovsk Krai",
            "Khakassia",
            "Khanty-Mansi",
            "Kirov Oblast",
            "Komi",
            "Kostroma Oblast",
            "Krasnodar Krai",
            "Krasnoyarsk Krai",
            "Kurgan Oblast",
            "Kursk Oblast",
            "Leningrad Oblast",
            "Lipetsk Oblast",
            "Magadan Oblast",
            "Mari El",
            "Mordovia",
            "Moscow",
            "Moscow Oblast",
            "Murmansk Oblast",
            "Nenets",
            "Nizhny Novgorod Oblast",
            "North Ossetia-Alania",
            "Novgorod Oblast",
            "Novosibirsk Oblast",
            "Omsk Oblast",
            "Orenburg Oblast",
            "Oryol Oblast",
            "Penza Oblast",
            "Perm Krai",
            "Primorsky Krai",
            "Pskov Oblast",
            "Rostov Oblast",
            "Ryazan Oblast",
            "Sakha Republic",
            "Sakhalin Oblast",
            "Samara Oblast",
            "Saint Petersburg",
            "Saratov Oblast",
            "Smolensk Oblast",
            "Stavropol Krai",
            "Sverdlovsk Oblast",
            "Tambov Oblast",
            "Tatarstan",
            "Tomsk Oblast",
            "Tula Oblast",
            "Tuva",
            "Tver Oblast",
            "Tyumen Oblast",
            "Udmurtia",
            "Ulyanovsk Oblast",
            "Vladimir Oblast",
            "Volgograd Oblast",
            "Vologda Oblast",
            "Voronezh Oblast",
            "Yamalo-Nenets",
            "Yaroslavl Oblast",
            "Zabaykalsky Krai"
        ]
    },
    "Uzbek": {
        name: "Uzbekistan",
        provinces: [
            "Andijan",
            "Bukhara",
            "Fergana",
            "Jizzakh",
            "Karakalpakstan",
            "Namangan",
            "Navoiy",
            "Qashqadaryo",
            "Samarqand",
            "Sirdaryo",
            "Surxondaryo",
            "Tashkent",
            "Tashkent City",
            "Xorazm"
        ]
    },
    "Kazakh": {
        name: "Kazakhstan",
        provinces: [
            "Abai",
            "Akmola",
            "Aktobe",
            "Almaty",
            "Almaty City",
            "Atyrau",
            "East Kazakhstan",
            "Jambyl",
            "Jetisu",
            "Karaganda",
            "Kostanay",
            "Kyzylorda",
            "Mangystau",
            "North Kazakhstan",
            "Nur-Sultan",
            "Pavlodar",
            "Turkistan",
            "Ulytau",
            "West Kazakhstan"
        ]
    },
    "Kyrgyz": {
        name: "Kyrgyzstan",
        provinces: [
            "Batken",
            "Bishkek",
            "Chuy",
            "Issyk-Kul",
            "Jalal-Abad",
            "Naryn",
            "Osh",
            "Osh City",
            "Talas"
        ]
    },
    "Tajik": {
        name: "Tajikistan",
        provinces: [
            "Dushanbe",
            "Gorno-Badakhshan",
            "Khatlon",
            "Sughd",
            "Districts of Republican Subordination"
        ]
    },
    "Turkmen": {
        name: "Turkmenistan",
        provinces: [
            "Ahal",
            "Ashgabat",
            "Balkan",
            "Dashoguz",
            "Lebap",
            "Mary"
        ]
    },
    "Azerbaijani": {
        name: "Azerbaijan",
        provinces: [
            "Absheron",
            "Agdam",
            "Agdash",
            "Agstafa",
            "Agsu",
            "Astara",
            "Baku",
            "Balakan",
            "Barda",
            "Beylagan",
            "Bilasuvar",
            "Dashkasan",
            "Fuzuli",
            "Ganja",
            "Gobustan",
            "Goranboy",
            "Goychay",
            "Goygol",
            "Hajigabul",
            "Imishli",
            "Ismayilli",
            "Jabrayil",
            "Jalilabad",
            "Kalbajar",
            "Khachmaz",
            "Khizi",
            "Khojaly",
            "Kurdamir",
            "Lachin",
            "Lankaran",
            "Lankaran City",
            "Lerik",
            "Masally",
            "Mingachevir",
            "Naftalan",
            "Nakhchivan",
            "Neftchala",
            "Oghuz",
            "Qabala",
            "Qakh",
            "Qazakh",
            "Quba",
            "Qubadli",
            "Qusar",
            "Saatly",
            "Sabirabad",
            "Salyan",
            "Shabran",
            "Shaki",
            "Shamakhi",
            "Shamkir",
            "Shirvan",
            "Shusha",
            "Siazan",
            "Sumgayit",
            "Tartar",
            "Tovuz",
            "Ujar",
            "Yardymli",
            "Yevlakh",
            "Zangilan",
            "Zaqatala",
            "Zardab"
        ]
    },
    "Philippines": {
        name: "Philippines",
        provinces: [
            "Abra",
            "Agusan del Norte",
            "Agusan del Sur",
            "Aklan",
            "Albay",
            "Antique",
            "Apayao",
            "Aurora",
            "Basilan",
            "Bataan",
            "Batanes",
            "Batangas",
            "Benguet",
            "Biliran",
            "Bohol",
            "Bukidnon",
            "Bulacan",
            "Cagayan",
            "Camarines Norte",
            "Camarines Sur",
            "Camiguin",
            "Capiz",
            "Catanduanes",
            "Cavite",
            "Cebu",
            "Cotabato",
            "Davao de Oro",
            "Davao del Norte",
            "Davao del Sur",
            "Davao Occidental",
            "Davao Oriental",
            "Dinagat Islands",
            "Eastern Samar",
            "Guimaras",
            "Ifugao",
            "Ilocos Norte",
            "Ilocos Sur",
            "Iloilo",
            "Isabela",
            "Kalinga",
            "La Union",
            "Laguna",
            "Lanao del Norte",
            "Lanao del Sur",
            "Leyte",
            "Maguindanao",
            "Marinduque",
            "Masbate",
            "Metro Manila",
            "Misamis Occidental",
            "Misamis Oriental",
            "Mountain Province",
            "Negros Occidental",
            "Negros Oriental",
            "Northern Samar",
            "Nueva Ecija",
            "Nueva Vizcaya",
            "Occidental Mindoro",
            "Oriental Mindoro",
            "Palawan",
            "Pampanga",
            "Pangasinan",
            "Quezon",
            "Quirino",
            "Rizal",
            "Romblon",
            "Samar",
            "Sarangani",
            "Siquijor",
            "Sorsogon",
            "South Cotabato",
            "Southern Leyte",
            "Sultan Kudarat",
            "Sulu",
            "Surigao del Norte",
            "Surigao del Sur",
            "Tarlac",
            "Tawi-Tawi",
            "Zambales",
            "Zamboanga del Norte",
            "Zamboanga del Sur",
            "Zamboanga Sibugay"
        ]
    },
    "Thai": {
        name: "Thailand",
        provinces: [
            "Amnat Charoen",
            "Ang Thong",
            "Bangkok",
            "Bueng Kan",
            "Buri Ram",
            "Chachoengsao",
            "Chai Nat",
            "Chaiyaphum",
            "Chanthaburi",
            "Chiang Mai",
            "Chiang Rai",
            "Chon Buri",
            "Chumphon",
            "Kalasin",
            "Kamphaeng Phet",
            "Kanchanaburi",
            "Khon Kaen",
            "Krabi",
            "Lampang",
            "Lamphun",
            "Loei",
            "Lop Buri",
            "Mae Hong Son",
            "Maha Sarakham",
            "Mukdahan",
            "Nakhon Nayok",
            "Nakhon Pathom",
            "Nakhon Phanom",
            "Nakhon Ratchasima",
            "Nakhon Sawan",
            "Nakhon Si Thammarat",
            "Nan",
            "Narathiwat",
            "Nong Bua Lam Phu",
            "Nong Khai",
            "Nonthaburi",
            "Pathum Thani",
            "Pattani",
            "Phangnga",
            "Phatthalung",
            "Phayao",
            "Phetchabun",
            "Phetchaburi",
            "Phichit",
            "Phitsanulok",
            "Phra Nakhon Si Ayutthaya",
            "Phrae",
            "Phuket",
            "Prachin Buri",
            "Prachuap Khiri Khan",
            "Ranong",
            "Ratchaburi",
            "Rayong",
            "Roi Et",
            "Sa Kaeo",
            "Sakon Nakhon",
            "Samut Prakan",
            "Samut Sakhon",
            "Samut Songkhram",
            "Saraburi",
            "Satun",
            "Sing Buri",
            "Sisaket",
            "Songkhla",
            "Sukhothai",
            "Suphan Buri",
            "Surat Thani",
            "Surin",
            "Tak",
            "Trang",
            "Trat",
            "Ubon Ratchathani",
            "Udon Thani",
            "Uthai Thani",
            "Uttaradit",
            "Yala",
            "Yasothon"
        ]
    }
    };

    // Populate country and province dropdowns
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

    // Add event listeners for nationality changes
    nationalitySelect.addEventListener('change', (e) => {
        const selectedCountry = e.target.value;
        populateProvinceDropdown(selectedCountry, provinceSelect);
    });

    editNationalitySelect.addEventListener('change', (e) => {
        const selectedCountry = e.target.value;
        populateProvinceDropdown(selectedCountry, editProvinceSelect);
    });

    // Initialize country dropdowns
    populateCountryDropdown(nationalitySelect);
    populateCountryDropdown(editNationalitySelect);

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
            
            // Populate provinces for the selected nationality
            populateProvinceDropdown(pilgrim.nationality, editProvinceSelect);
            editProvinceSelect.value = pilgrim.province;
            
            document.getElementById('editDateAndTime').value = pilgrim.dateAndTime;
            document.getElementById('editDestination').value = pilgrim.destination;
            
            editPilgrimForm.dataset.id = pilgrimId;
        } catch (error) {
            console.error('Error fetching pilgrim data:', error);
        }
    }

    // Handle edit form submission
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