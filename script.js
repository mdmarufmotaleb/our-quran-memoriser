// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {

    // Get the "Generate" button and verse label by their IDs
    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text"); // The label for displaying the verse

    // Add a click event listener to the button
    generateButton.addEventListener("click", generate_verse);

    // Define the generate_verse function
    function generate_verse() {

        var min_page = 1;
        var max_page = 9; //max 604

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
