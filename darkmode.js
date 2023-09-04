// Function to load the user's dark mode preference from localStorage
function loadDarkModePreference() {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");
    const darkModeCheckbox = document.getElementById("darkModeCheckBox");
    const articleElement = document.querySelector("article[data-theme]");

    if (darkModeEnabled === "true") {
        // Enable dark mode by setting data-theme="dark"
        articleElement.setAttribute("data-theme", "dark");
        // Check the dark mode checkbox
        darkModeCheckbox.checked = true;
    } else {
        // Disable dark mode by setting data-theme="light"
        articleElement.setAttribute("data-theme", "light");
        // Uncheck the dark mode checkbox
        darkModeCheckbox.checked = false;
    }
}

// Add an event listener to load the user's dark mode preference when the page loads
document.addEventListener("DOMContentLoaded", loadDarkModePreference);


// Add an event listener to load the user's dark mode preference when the page loads
document.addEventListener("DOMContentLoaded", loadDarkModePreference);


function toggleDarkMode() {
    const darkModeCheckbox = document.getElementById("darkModeCheckBox");
    const articleElement = document.querySelector("article[data-theme]");

    // Check if the checkbox is checked
    if (darkModeCheckbox.checked) {
        // Enable dark mode by setting data-theme="dark"
        articleElement.setAttribute("data-theme", "dark");
        // Store the user's preference in localStorage
        localStorage.setItem("darkModeEnabled", "true");
    } else {
        // Disable dark mode by setting data-theme="light"
        articleElement.setAttribute("data-theme", "light");
        // Store the user's preference in localStorage
        localStorage.setItem("darkModeEnabled", "false");
    }
}


// Event listener for the dark mode checkbox
document.getElementById("darkModeCheckBox").addEventListener("change", toggleDarkMode); // Corrected ID

