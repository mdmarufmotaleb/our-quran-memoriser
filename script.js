var min_page = 1;
var max_page = 604;

var min_surah = 1;
var max_surah = 114;

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {

    // Get the "Generate" button and verse label by their IDs
    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text"); // The label for displaying the verse
    const minPageElement = document.getElementById("min-page"); // Min-page input
    const maxPageElement = document.getElementById("max-page"); // Max-page input



    document.getElementById("min-page").addEventListener("change", function () {
        min_page = minPageElement ? parseInt(minPageElement.value) : 1;

        if (min_page < 1) {
            min_page = 1; 
        }
        if (min_page > 604) {
            min_page = 604; 
        }
        if (min_page > max_page) {
            min_page = max_page; 
        }
        minPageElement.value = min_page;
    });

    document.getElementById("max-page").addEventListener("change", function () {
        max_page = maxPageElement ? parseInt(maxPageElement.value) : 604;
        if (max_page > 604) {
            max_page = 604;
        }
        if (max_page < 1) {
            max_page = 1;
        }
        if (max_page < min_page) {
            max_page = min_page;
        }
        maxPageElement.value = max_page;
    });

    // Add a click event listener to the button
    generateButton.addEventListener("click", generate_verse);

    // Define the generate_verse function
    function generate_verse() {

        // Set min_page and max_page based on the input values or defaults
        min_page = minPageElement ? parseInt(minPageElement.value) : 1;
        max_page = maxPageElement ? parseInt(maxPageElement.value) : 604;

        // Ensure min_page and max_page are valid numbers
        min_page = isNaN(min_page) ? 1 : min_page;
        max_page = isNaN(max_page) ? 604 : max_page;

        var page_number = Math.floor(Math.random() * (max_page - min_page + 1)) + min_page;

        // API endpoint for generating a random verse with page_number
        const apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&page_number=${page_number}`;

        // Fetch request to the API endpoint
        fetch(apiEndpoint)
            .then(response => {
                // Check if the response is okay
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parse the response as JSON
            })
            .then(data => {
                // Update the label with the verse
                verseLabel.textContent = data.verse.text_uthmani; // Assuming the verse text is in data.verse.text_uthmani
            })
            .catch(error => {
                // Handle errors and print to the console
                console.error('There was a problem with the fetch operation:', error);
                verseLabel.textContent = "Error fetching verse"; // Display error message on label
            });
    }
});
