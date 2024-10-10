// API key and region (you should securely inject this in your environment, but for demo purposes, we're including it here)
const apiKey = '8c79232f395c4971a03a30a514e2bd38'; // Replace this with your actual key
const apiRegion = 'uaenorth';

// Function to make a request to Microsoft Translator API
async function translateText(text, targetLanguage) {
    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': apiRegion,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ Text: text }]),
    });

    const data = await response.json();
    return data[0]?.translations[0]?.text || '';
}

// Handle the language selection from the dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', async function(event) {
        const selectedLang = this.getAttribute('data-lang');
        console.log("Selected language: " + selectedLang);

        // Find the elements to translate (you can change the selector to match your needs)
        const elementsToTranslate = document.querySelectorAll('body *'); // Translate everything inside the body

        for (let element of elementsToTranslate) {
            if (element.innerText) {
                try {
                    // Translate the text content of each element
                    const translatedText = await translateText(element.innerText, selectedLang);
                    element.innerText = translatedText;
                } catch (error) {
                    console.error('Translation failed:', error);
                }
            }
        }
    });
});
