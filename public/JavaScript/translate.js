// Google Translate initialization
function googleTranslateElementInit() {
    console.log("Google Translate API loaded");

    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar', // Add more languages if needed
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_container');
}

// Dropdown language selector
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const selectedLang = this.getAttribute('data-lang'); // Get the selected language
        console.log("Selected language: " + selectedLang);
        
        var iframe = document.querySelector('iframe.goog-te-menu-frame');
        
        if (iframe) {
            var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

            // Trigger language change based on user selection
            var langOption = iframeContent.querySelector(`a[lang='${selectedLang}']`);
            if (langOption) {
                langOption.click();
            } else {
                console.log("Language option not found.");
            }
        } else {
            console.log("Iframe not found.");
        }
    });
});
