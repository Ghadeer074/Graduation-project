// Function to call your server to get the translated text
async function fetchTranslation(text, targetLanguage) {
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, targetLanguage })
        });

        const data = await response.json();
        return data.translatedText; // The translated text returned from the server
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Fallback to original text if translation fails
    }
}

// Utility function to check if an element's text should be translated
function shouldTranslateElement(element) {
    return element.tagName !== 'IMG'; // Exclude images, but translate everything else
}

// Function to translate text content of the page
async function translatePage(selectedLang) {
    const elementsToTranslate = document.querySelectorAll('body *');

    for (let element of elementsToTranslate) {
        if (shouldTranslateElement(element)) {
            for (let node of element.childNodes) {
                // Translate only text nodes, not attributes or tags
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                    const originalText = node.nodeValue.trim();
                    const translatedText = await fetchTranslation(originalText, selectedLang);
                    node.nodeValue = translatedText;
                }
            }

            // Translate text for elements like buttons, links, and placeholders
            if (element.placeholder) {
                const translatedPlaceholder = await fetchTranslation(element.placeholder, selectedLang);
                element.placeholder = translatedPlaceholder;
            }
            if (element.alt) {
                const translatedAlt = await fetchTranslation(element.alt, selectedLang);
                element.alt = translatedAlt;
            }
        }
    }
}

// Event listener for language change
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', async function(event) {
        const selectedLang = this.getAttribute('data-lang');
        console.log("Selected language:", selectedLang);

        // Translate the page to the selected language
        await translatePage(selectedLang);
    });
});
