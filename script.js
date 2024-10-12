// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {

    // Get the "Generate" button and verse label by their IDs
    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text"); // The label for displaying the verse

    // Add a click event listener to the button
    generateButton.addEventListener("click", function () {

        // API endpoint for generating a random verse
        const apiEndpoint = "https://api.quran.com/api/v4/verses/random?fields=text_uthmani";

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
                // Print the result to the console
                console.log(data);

                // OPTIONAL: If you want to display the fetched verse inside the label, you can do it here:
                // For example, assuming the verse text is in `data.verse.text`:
                verseLabel.textContent = data.verse.text_uthmani; // Update the label with the verse
            })
            .catch(error => {
                // Handle errors and print to the console
                console.error('There was a problem with the fetch operation:', error);
                verseLabel.textContent = "Error fetching verse"; // Display error message on label
            });
    });
});
