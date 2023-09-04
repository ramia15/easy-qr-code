// main.js

let originalUrl = '';
let urlShortened = false; // Add a flag to track if URL is shortened

// Add an event listener to the "Shorten URL" button
document.getElementById('shortenButton').addEventListener('click', async () => {
    const urlInput = document.getElementById('qrUrl');
    const url = urlInput.value;
    const shortenButton = document.getElementById('shortenButton');

    if (!url) {
        alert('URL is required');
        return;
    }

    try {
        if (!urlShortened) {
            // Set the data-tooltip attribute
            shortenButton.setAttribute('data-tooltip', 'Original URL: ' + url);

            // Add a custom class to visually disable the button
            shortenButton.classList.add('custom-disabled');
            const response = await fetch('http://localhost:5500/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                const shortUrl = await response.text();
                if (shortUrl) {
                    // Display the shortened URL in the input field
                    urlInput.value = shortUrl;
                    originalUrl = url; // Store the original URL
                    urlShortened = true; // Set the flag to true

                    // Set the data-tooltip attribute
                    shortenButton.setAttribute('data-tooltip', 'Original URL: ' + url);

                    // Update the button text
                    shortenButton.textContent = 'URL Shortened';
                } else {
                    console.error('Invalid response format');
                }
            } else {
                console.error('Failed to shorten URL:', response.statusText);
                // Handle the failed request (e.g., display an error message)
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Re-enable the button only if the original URL is empty and URL is shortened
        if (!originalUrl.trim() && urlShortened) {
            shortenButton.textContent = 'Shorten URL';
            shortenButton.disabled = false;

            // Remove the data-tooltip attribute
            shortenButton.removeAttribute('data-tooltip');
        }
    }
});

// Add an input event listener to the "qrUrl" input to re-enable the button when it's empty
document.getElementById('qrUrl').addEventListener('input', resetURLInputField);

// Function to reset the URL input field
function resetURLInputField() {
    const shortenButton = document.getElementById('shortenButton');
    const urlInput = document.getElementById('qrUrl');
    
    shortenButton.classList.remove('custom-disabled');
    shortenButton.textContent = 'Shorten URL';
    shortenButton.disabled = false;

    // Remove the data-tooltip attribute
    shortenButton.removeAttribute('data-tooltip');

    // Clear the data-original-url attribute
    urlInput.setAttribute('data-original-url', '');
    
    // Reset the URL shortened flag
    urlShortened = false;
}

// Event listener for the "Start Over" button
document.getElementById("buttonQrReset").addEventListener("click", function () {
    resetForm();
});