var min_page = 1;
var max_page = 604;

var min_surah = 1;
var max_surah = 114;

var min_juz = 1;
var max_juz = 30;

var min_page_set = false;
var min_surah_set = false;
var min_juz_set = false;

var max_page_set = false;
var max_surah_set = false;
var max_juz_set = false;

document.addEventListener("DOMContentLoaded", function () {

    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text");

    const thisPage = document.getElementById("current-page");
    const thisSurah = document.getElementById("current-surah");
    const thisJuz = document.getElementById("current-juz");
    
    const minPageElement = document.getElementById("min-page"); 
    const maxPageElement = document.getElementById("max-page"); 

    const minSurahElement = document.getElementById("min-surah");
    const maxSurahElement = document.getElementById("max-surah");

    const minJuzElement = document.getElementById("min-juz");
    const maxJuzElement = document.getElementById("max-juz");

    minPageElement.addEventListener("change", function () {
        if (minPageElement.value.trim() === "") {
            min_page = "";
            min_page_set = false;
        } else {
            min_page = parseInt(minPageElement.value);
            min_page_set = true;
        }

        // if (maxPageElement.value.trim() === "" && minPageElement.value.trim() !== "") {
        //     max_page = 604;
        //     maxPageElement.value = max_page;
        // }

        if (min_page !== "") {
            if (min_page < 1) {
                min_page = 1; 
            }
            if (min_page > 604) {
                min_page = 604; 
            }
            if (min_page > max_page) {
                min_page = max_page; 
            }
        }
        minPageElement.value = min_page;
    });

    maxPageElement.addEventListener("change", function () {
        if (maxPageElement.value.trim() === "") {
            max_page = "";
            max_page_set = false;
        } else {
            max_page = parseInt(maxPageElement.value);
            max_page_set = true;
        }

        // if (minPageElement.value.trim() === "" && maxPageElement.value.trim() !== "") {
        //     min_page = 1;
        //     minPageElement.value = min_page;
        // }
    
        if (max_page !== "") {
            if (max_page > 604) {
                max_page = 604;
            }
            if (max_page < 1) {
                max_page = 1;
            }
            if (max_page < min_page) {
                max_page = min_page;
            }
        }
    
        maxPageElement.value = max_page;
    });    

    minSurahElement.addEventListener("change", function () {
        if (minSurahElement.value.trim() === "") {
            min_surah = "";
            min_surah_set = false;
        } else {
            min_surah = parseInt(minSurahElement.value);
            min_surah_set = true;
        }

        // if (maxSurahElement.value.trim() === "" && minSurahElement.value.trim() !== "") {
        //     max_surah = 114;
        //     maxSurahElement.value = max_surah;
        // }
    
        if (min_surah !== "") {
            if (min_surah < 1) {
                min_surah = 1; 
            }
            if (min_surah > 114) {
                min_surah = 114; 
            }
            if (min_surah > max_surah) {
                min_surah = max_surah; 
            }
        }
    
        minSurahElement.value = min_surah;
    });
    
    maxSurahElement.addEventListener("change", function () {
        if (maxSurahElement.value.trim() === "") {
            max_surah = "";
            max_surah_set = false;
        } else {
            max_surah = parseInt(maxSurahElement.value);
            max_surah_set = true;
        }

        // if (minSurahElement.value.trim() === "" && maxSurahElement.value.trim() !== "") {
        //     min_surah = 1;
        //     minSurahElement.value = min_surah;
        // }
    
        if (max_surah !== "") {
            if (max_surah > 114) {
                max_surah = 114;
            }
            if (max_surah < 1) {
                max_surah = 1;
            }
            if (max_surah < min_surah) {
                max_surah = min_surah;
            }
        }
    
        maxSurahElement.value = max_surah;
    });

    minJuzElement.addEventListener("change", function () {
        if (minJuzElement.value.trim() === "") {
            min_juz = "";
            min_juz_set = false;
        } else {
            min_juz = parseInt(minJuzElement.value);
            min_juz_set = true;
        }

        // if (maxJuzElement.value.trim() === "" && minJuzElement.value.trim() !== "") {
        //     max_juz = 30;
        //     maxJuzElement.value = max_juz;
        // }

        if (min_juz !== "") {
            if (min_juz < 1) {
                min_juz = 1; 
            }
            if (min_juz > 30) {
                min_juz = 30; 
            }
            if (min_juz > max_juz) {
                min_juz = max_juz; 
            }
        }
        minJuzElement.value = min_juz;
    });

    maxJuzElement.addEventListener("change", function () {
        if (maxJuzElement.value.trim() === "") {
            max_juz = "";
            max_juz_set = false;
        } else {
            max_juz = parseInt(maxJuzElement.value);
            max_juz_set = true;
        }

        // if (minJuzElement.value.trim() === "" && maxJuzElement.value.trim() !== "") {
        //     min_juz = 1;
        //     minJuzElement.value = min_juz;
        // }
    
        if (max_juz !== "") {
            if (max_juz > 30) {
                max_juz = 30;
            }
            if (max_juz < 1) {
                max_juz = 1;
            }
            if (max_juz < min_juz) {
                max_juz = min_juz;
            }
        }
    
        maxJuzElement.value = max_juz;
    });
    
    generateButton.addEventListener("click", generate_verse);

    function generate_verse() {

        min_page = minPageElement ? parseInt(minPageElement.value) : 1;
        max_page = maxPageElement ? parseInt(maxPageElement.value) : 604;

        min_page = isNaN(min_page) ? 1 : min_page;
        max_page = isNaN(max_page) ? 604 : max_page;

        min_surah = minSurahElement ? parseInt(minSurahElement.value) : 1;
        max_surah = maxSurahElement ? parseInt(maxSurahElement.value) : 114;

        min_surah = isNaN(min_surah) ? 1 : min_surah;
        max_surah = isNaN(max_surah) ? 114 : max_surah;

        min_juz = minJuzElement ? parseInt(minJuzElement.value) : 1;
        max_juz = maxJuzElement ? parseInt(maxJuzElement.value) : 30;

        min_juz = isNaN(min_juz) ? 1 : min_juz;
        max_juz = isNaN(max_juz) ? 30 : max_juz;

        var page_number = Math.floor(Math.random() * (max_page - min_page + 1)) + min_page;
        var surah_number = Math.floor(Math.random() * (max_surah - min_surah + 1)) + min_surah;
        var juz_number = Math.floor(Math.random() * (max_juz - min_juz + 1)) + min_juz;

        var filters = [];

        if(min_page_set || max_page_set) {
            filters.push("page_set");
        }
        if(min_surah_set || max_surah_set) {
            filters.push("surah_set");
        }
        if(min_juz_set || max_juz_set) {
            filters.push("juz_set");
        }

        var apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani`;
        if(filters.length > 0) {
            var chosen_filter_index = Math.floor(Math.random() * filters.length) + 1;
            var chosen_filter = filters[chosen_filter_index-1];

            if(chosen_filter === "page_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&page_number=${page_number}`;
            }
            if(chosen_filter === "surah_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&chapter_number=${surah_number}`;
            }
            if(chosen_filter === "juz_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&juz_number=${juz_number}`;
            }
        }

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
                verseLabel.textContent = data.verse.text_uthmani;
                var this_page = data.verse.page_number;
                var this_surah = parseInt(String(data.verse.verse_key).match(/^(\d+):/)[1], 10);
                var this_juz = data.verse.juz_number; 

                thisPage.textContent = this_page;
                thisSurah.textContent = this_surah;
                thisJuz.textContent = this_juz;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                verseLabel.textContent = "Error fetching verse";
            });
    }

    // Add functionality to the Reset button
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function() {
        minPageElement.value = "";
        maxPageElement.value = "";
        minSurahElement.value = "";
        maxSurahElement.value = "";
        minJuzElement.value = "";
        maxJuzElement.value = "";
    });
});
