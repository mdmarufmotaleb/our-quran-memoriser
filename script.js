// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {

    // Get the "Generate" button and verse label by their IDs
    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text"); // The label for displaying the verse

    // Add a click event listener to the button
    generateButton.addEventListener("click", generate_verse);

    // Define the generate_verse function
    function generate_verse() {

        // Get min and max page values from the elements with specified IDs
        const minPageElement = document.getElementById("min-page");
        const maxPageElement = document.getElementById("max-page");

        // Set min_page and max_page based on the input values or defaults
        var min_page = minPageElement ? parseInt(minPageElement.value) : 1;
        var max_page = maxPageElement ? parseInt(maxPageElement.value) : 604;

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
