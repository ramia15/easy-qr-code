// Function to check the contrast between two colors
function checkContrast(color1, color2) {
    // Convert color values to RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Calculate relative luminance for each color
    const luminance1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
    const luminance2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

    // Calculate contrast ratio
    const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);

    // Check if the contrast ratio meets accessibility guidelines (e.g., WCAG)
    return contrastRatio >= 4.1; // Adjust this value as needed
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

// Function to calculate luminance
function calculateLuminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Function to update the warning message
function updateContrastWarning() {
    const qrColorPicker = document.getElementById("qrColorPicker");
    const qrColorInput = document.getElementById("qrColor");
    const bgColorPicker = document.getElementById("bgColorPicker");
    const bgColorInput = document.getElementById("bgColor");
    const warningMessage = document.querySelector(".contrastWarning");

    const qrColor = qrColorPicker.value || qrColorInput.value;
    const bgColor = bgColorPicker.value || bgColorInput.value;

    console.log("QR Color: " + qrColor);
    console.log("Background Color: " + bgColor);

    if (!checkContrast(qrColor, bgColor)) {
        console.log("Displaying contrast warning");
        warningMessage.style.display = "block";
    } else {
        console.log("Hiding contrast warning");
        warningMessage.style.display = "none";
    }
}

// Event listeners for color inputs and input fields
document.getElementById("qrColorPicker").addEventListener("input", updateContrastWarning);
document.getElementById("qrColor").addEventListener("input", updateContrastWarning);
document.getElementById("bgColorPicker").addEventListener("input", updateContrastWarning);
document.getElementById("bgColor").addEventListener("input", updateContrastWarning);
