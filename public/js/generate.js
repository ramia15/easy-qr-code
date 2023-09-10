// Initialize qrious instance with default values
let qr;

// Define the size options
const smallSize = 480;
const mediumSize = 720;
const largeSize = 1080;

// Initialize uwidth and uheight with the default size (mediumSize)
let uwidth = mediumSize;
let uheight = mediumSize;
console.log(uwidth + " " + uheight);

// Set the color picker values on page load
document.addEventListener('DOMContentLoaded', function () {
    const qrColorHex = document.getElementById('qrColor').value;
    const bgColorHex = document.getElementById('bgColor').value;

    // Convert hex values to RGB
    const qrColorRgb = hexToRgb(qrColorHex);
    const bgColorRgb = hexToRgb(bgColorHex);

    // Set the color picker values with RGB format
    document.getElementById('qrColorPicker').value = `rgb(${qrColorRgb.r}, ${qrColorRgb.g}, ${qrColorRgb.b})`;
    document.getElementById('bgColorPicker').value = `rgb(${bgColorRgb.r}, ${bgColorRgb.g}, ${bgColorRgb.b})`;
});

// Function to convert hex color to RGB
function hexToRgb(hex) {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal value into RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

// Function to synchronize color picker and input field
function syncColorPickerAndInput(colorPickerId, inputId) {
    const colorPicker = document.getElementById(colorPickerId);
    const inputField = document.getElementById(inputId);

    // When color picker changes, update input field value
    colorPicker.addEventListener('input', () => {
        inputField.value = `#${colorPicker.value.replace('#', '')}`; // Add or update '#'
    });

    // When input field changes, update color picker value
    inputField.addEventListener('input', () => {
        let hex = inputField.value.trim().replace(/^#/, ''); // Remove '#' if present

        // Ensure the hex code is valid and doesn't exceed 6 characters
        if (/^[0-9A-Fa-f]{0,6}$/.test(hex)) {
            // Add '#' if not present and update the color picker value
            if (hex.length > 0) {
                hex = `#${hex}`;
            }
            colorPicker.value = hex;
            inputField.value = hex; // Update input field value with '#' added
        } else {
            // Handle cases where the input exceeds 6 characters
            inputField.value = colorPicker.value; // Revert input field to match color picker
        }
    });

    // When the input field loses focus (user clicks out of the input), expand 3-character hex codes
    inputField.addEventListener('blur', () => {
        let hex = inputField.value.trim().replace(/^#/, ''); // Remove '#' if present

        // Expand 3-character hex codes to 6 characters
        if (hex.length === 3) {
            hex = hex.replace(/(.)/g, '$1$1');
            colorPicker.value = `#${hex}`;
            inputField.value = `#${hex}`;
        }
    });
}

// Synchronize QR code color picker and input
syncColorPickerAndInput('qrColorPicker', 'qrColor');

// Synchronize background color picker and input
syncColorPickerAndInput('bgColorPicker', 'bgColor');

// Function to convert hex or RGB color to string
function colorToString(color) {
    if (color.startsWith("#") || color.startsWith("rgb")) {
        return color;
    } else {
        // Default to black if the color format is not recognized
        return "#000000";
    }
}

// Set the color picker values on page load
document.addEventListener('DOMContentLoaded', function () {
    const qrColorHex = document.getElementById('qrColor').value;
    const bgColorHex = document.getElementById('bgColor').value;

    // Set the color picker values by converting hex to RGB
    document.getElementById('qrColorPicker').value = colorToString(qrColorHex);
    document.getElementById('bgColorPicker').value = colorToString(bgColorHex);
});

// Event listener for the URL input field
document.getElementById("qrUrl").addEventListener("input", function () {
    const generateButton = document.getElementById("buttonQrSubmit");
    const qrUrl = this.value.trim(); // Get the trimmed value of the input

    // Check if the URL is empty
    if (qrUrl === "") {
        generateButton.disabled = true; // Disable the button if the URL is empty
        resetForm(); // Call the reset function when the input is cleared
    } else {
        generateButton.disabled = false; // Enable the button if there is a URL
    }
});

// Internal function to generate the QR code (without delay)
function generateQRCodeInternal(width, height) {
    var qrUrl = document.getElementById("qrUrl").value;
    var qrColor = colorToString(document.getElementById("qrColor").value);
    var bgColor = colorToString(document.getElementById("bgColor").value);

    console.log("URL: " + qrUrl);
    console.log("QR Color: " + qrColor);
    console.log("Background Color: " + bgColor);

    // Check if the URL is empty
    if (!qrUrl.trim()) {
        // URL field is empty, you can add an error message or take other actions here
        return; // Don't generate the QR code if the URL is empty
    }

    // Remove the existing QR code image if it exists
    const existingQRCode = document.getElementById("qrcode");
    if (existingQRCode) {
        existingQRCode.remove();
    }

    // Create a new QR code image element
    const qrcodeImage = document.createElement("img");
    qrcodeImage.id = "qrcode";
    qrcodeImage.className = "img-responsive center-block";

    // Append the QR code image to the container
    const qrcodeContainer = document.getElementById("qrcode-container");
    qrcodeContainer.appendChild(qrcodeImage);

    // Generate the QR code with the provided values and size
    qr = new QRious({
        element: qrcodeImage,
        value: qrUrl,
        size: {
            width: width,
            height: height,
        },
        foreground: qrColor,
        background: bgColor,
    });

    // Optionally, set a custom size using qrious instance
    qr.size = width;

    // Show the download button when the QR code is generated
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.style.display = "block";
}

// Update QR code colors
const qrColor = document.getElementById("qrColor").value;
const bgColor = document.getElementById("bgColor").value;

document.documentElement.style.setProperty("--qr-color", qrColor);
document.documentElement.style.setProperty("--bg-color", bgColor);

// Function to set the QR code size
function setQRCodeSize(sizeOption) {
    switch (sizeOption) {
        case "small":
            uwidth = uheight = smallSize;
            break;
        case "medium":
            uwidth = uheight = mediumSize;
            break;
        case "large":
            uwidth = uheight = largeSize;
            break;
        default:
            // Default to medium size if an invalid option is provided
            uwidth = uheight = mediumSize;
            break;
    }

    console.log(uwidth + " " + uheight);
}

// Event listeners for size radio buttons
document.getElementById("btnSmall").addEventListener("change", function () {
    setQRCodeSize("small");
});

document.getElementById("btnMed").addEventListener("change", function () {
    setQRCodeSize("medium");
});

document.getElementById("btnLarge").addEventListener("change", function () {
    setQRCodeSize("large");
});

// Event listener for Generate QR Code button
document.getElementById("buttonQrSubmit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    setQRCodeSize(document.querySelector('input[name="size"]:checked').value);
    generateQRCode(); // This line calls the generateQRCode function
    console.log("submitted");
});

// Function to generate and display the QR code
function generateQRCode() {
    // Generate the QR code immediately with the current size
    generateQRCodeInternal(uwidth, uheight);
}

// Event listener for the Download QR Code button
document.getElementById("downloadButton").addEventListener("click", function () {
    // Get the QR code canvas as a data URL
    const qrCanvas = document.getElementById("qrcode");
    const qrDataURL = qr.toDataURL("image/png");

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = qrDataURL;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
});

// Event listener for the "Start Over" button
document.getElementById("buttonQrReset").addEventListener("click", function () {
    resetForm();
});

// Function to reset the form and QR code
function resetForm() {
    // Reset the form to its initial state
    const form = document.querySelector(".qrForm");
    form.reset();

    // Disable the "Generate QR Code" button
    const generateButton = document.getElementById("buttonQrSubmit");
    generateButton.disabled = true;

    // Remove the existing QR code image if it exists
    const existingQRCode = document.getElementById("qrcode");
    if (existingQRCode) {
        // Replace the QR code with a placeholder graphic
        const placeholderImage = document.createElement("img");
        placeholderImage.src = "placeholder.svg"; // Replace with the path to your placeholder image
        placeholderImage.id = "qrcode";
        placeholderImage.className = "img-responsive center-block";

        const qrcodeContainer = document.getElementById("qrcode-container");
        qrcodeContainer.innerHTML = '';
        qrcodeContainer.appendChild(placeholderImage);
    }

    // Hide the low contrast warning
    const contrastWarning = document.querySelector(".contrastWarning");
    contrastWarning.style.display = "none";

    // Hide the download button
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.style.display = "none";

    // Update QR code colors
    const qrColor = document.getElementById("qrColor").value;
    const bgColor = document.getElementById("bgColor").value;

    document.documentElement.style.setProperty("--qr-color", qrColor);
    document.documentElement.style.setProperty("--bg-color", bgColor);

    // Create a new QRious instance
    qr = null;

    // Call the resetURLInputField function
    resetURLInputField();
    console.log("reset success");
}
