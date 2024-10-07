// Google Translate initialization
function googleTranslateElementInit() {
    console.log("Google Translate API loaded");

    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar', // Add more languages if needed
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_container');
}

// Function to trigger language change
function triggerLanguageChange(selectedLang) {
    var iframe = document.querySelector('iframe.goog-te-menu-frame');

    // If the iframe is found, proceed to change the language
    if (iframe) {
        var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

        // Trigger language change based on user selection
        var langOption = iframeContent.querySelector(`a[lang='${selectedLang}']`);
        if (langOption) {
            langOption.click();
            console.log(`Switched to language: ${selectedLang}`);
        } else {
            console.log(`Language option for ${selectedLang} not found.`);
        }
    } else {
        console.log("Google Translate iframe not found. Retrying...");
        setTimeout(function() {
            triggerLanguageChange(selectedLang);
        }, 500); // Retry after 500 milliseconds
    }
}

// Add event listener to check if the Google Translate API script has loaded successfully
const script = document.createElement('script');
script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
script.onload = function() {
    console.log("Google Translate API script loaded successfully.");
};
script.onerror = function() {
    console.error("Failed to load the Google Translate API script.");
};
document.head.appendChild(script);

// Dropdown language selector event listener
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const selectedLang = this.getAttribute('data-lang'); // Get the selected language
        console.log("Selected language: " + selectedLang);

        // Trigger the language change function
        triggerLanguageChange(selectedLang);
    });
});

// Update aria-expanded attribute for the dropdown
const dropdownToggle = document.getElementById('lanicon');
dropdownToggle.addEventListener('click', function() {
    const ariaExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !ariaExpanded);
});
