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

var this_verse = "";
var this_verse_trimmed = "";
var this_verse_key;
var next_verse = "";


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

    const nextVerseButton = document.getElementById("next-verse");
    const previousVerseButton = document.getElementById("prev-verse");

    minPageElement.addEventListener("change", function () {
        if (minPageElement.value.trim() === "") {
            min_page = "";
            min_page_set = false;
        } else {
            min_page = parseInt(minPageElement.value);
            min_page_set = true;
        }

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
                display_verse(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                verseLabel.textContent = "Error fetching verse";
            });
    }

    function display_verse(data){

        this_verse = data.verse.text_uthmani;
        this_verse_key = data.verse.verse_key;
        this_verse = add_verse_number(this_verse, this_verse_key);
        this_verse_trimmed = this_verse_3_words(this_verse);
        this_verse_trimmed = remove_hizb_symbol(this_verse_trimmed);

        verseLabel.textContent = this_verse_trimmed;

        var this_page = data.verse.page_number;
        var this_surah = parseInt(String(this_verse_key).match(/^(\d+):/)[1], 10);
        var this_juz = data.verse.juz_number;
         
        thisPage.textContent = this_page;
        thisSurah.textContent = this_surah;
        thisJuz.textContent = this_juz;
    }

    function add_verse_number(this_verse, this_verse_key) {

        var verse_number = parseInt(this_verse_key.match(/^\d+:(\d+)$/)[1], 10);
        const arabicNumerals = {
            '0': '٠',
            '1': '١',
            '2': '٢',
            '3': '٣',
            '4': '٤',
            '5': '٥',
            '6': '٦',
            '7': '٧',
            '8': '٨',
            '9': '٩'
        };
    
        var verse_number_arabic = verse_number.toString().split('').map(digit => arabicNumerals[digit]).join('');
        return this_verse + " " + verse_number_arabic;
    }

    function this_verse_3_words(this_verse) {
        var words = this_verse.split(' ');
        var first_3_words = words.slice(0, 3).join(' ');
    
        // Trim any trailing spaces before checking the last character
        var trimmedLastWord = first_3_words.trim();
    
        // Regular expression to check if the last character is an Arabic numeral (٠ to ٩)
        var arabicNumeralRegex = /[\u0660-\u0669]$/;
    
        // If the last character is not an Arabic numeral, prepend "..."
        if (!arabicNumeralRegex.test(trimmedLastWord[trimmedLastWord.length - 1])) {
            return "... " + first_3_words;
        }
    
        // If it is an Arabic numeral, return the first 3 words without "..."
        return first_3_words;
    }

    document.getElementById("next-word").addEventListener("click", function() {
        // Split both the original and trimmed verse into arrays of words
        var originalWords = this_verse.split(' ');
        var trimmedWords = this_verse_trimmed.replace("... ", "").split(' ');
    
        // Regular expression to check if the last character is an Arabic numeral (٠ to ٩)
        var arabicNumeralRegex = /[\u0660-\u0669]$/;
    
        // Check if the trimmed verse has fewer words than the original
        if (trimmedWords.length < originalWords.length) {
            // Add the next word from the original verse to the trimmed one
            trimmedWords.push(originalWords[trimmedWords.length]);
    
            // Update the trimmed verse
            this_verse_trimmed = trimmedWords.join(' ');
    
            // Trim any trailing spaces before checking the last character
            var trimmedLastWord = this_verse_trimmed.trim();
    
            // Only prepend "..." if the current trimmed verse is not just "..."
            if (!this_verse_trimmed.includes("...") && trimmedWords.length > 1) {
                // Check if the last character is not an Arabic numeral before adding "..."
                if (!arabicNumeralRegex.test(trimmedLastWord[trimmedLastWord.length - 1])) {
                    this_verse_trimmed = "... " + this_verse_trimmed;
                }
            }
    
            // Update the label with the new trimmed verse
            verseLabel.textContent = this_verse_trimmed;
        }
    });
    
    
    document.getElementById("show-verse").addEventListener("click", function() {
        // Store the current value of verseLabel
        const currentVerseLabel = verseLabel.textContent;
    
        // Function to simulate clicking the next-word button
        function clickNextWord() {
            // Click the next-word button
            document.getElementById("next-word").click();
    
            // Check if the verseLabel has changed
            if (verseLabel.textContent !== currentVerseLabel) {
                // If it has changed, call the function again recursively
                clickNextWord();
            }
        }
    
        // Start the recursive clicking
        clickNextWord();
    });
    
    function remove_hizb_symbol(this_verse) {
        // Check if the symbol exists in the verse
        if (this_verse.includes("۞")) {
            // Remove the symbol
            return this_verse.replace(/۞/g, "");
        } else {
            return this_verse;
        }
    }



    document.getElementById("prev-word").addEventListener("click", function() {
        // Remove the "..." from the trimmed verse for processing
        var trimmedWords = this_verse_trimmed.replace("... ", "").split(' ');
    
        // Always remove the last word if there is one
        if (trimmedWords.length > 0) {
            trimmedWords.pop(); // Remove the last word
        }
    
        // Update the trimmed verse
        this_verse_trimmed = trimmedWords.join(' ');
    
        // Always add "..." at the end
        this_verse_trimmed = this_verse_trimmed ? "... " + this_verse_trimmed : "...";
    
        // Update the label with the new trimmed verse
        verseLabel.textContent = this_verse_trimmed;
    });
    
    

    nextVerseButton.addEventListener("click", function() {
        if(this_verse_key !== "") {
            next_verse(this_verse_key);
        }
    });

    function next_verse(verse_key) {
        const [surah, verse] = verse_key.split(":").map(Number); // Split the verse_key and convert to integers
    
        if (surah === 114 && verse === 6) {
            const firstVerseKey = "1:1"; // Get the first verse of Surah 1
            const firstVerseEndpoint = `https://api.quran.com/api/v4/verses/by_key/${firstVerseKey}?fields=text_uthmani`;
   
            return fetch(firstVerseEndpoint)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('First verse of Surah 1 not found');
                    }
                    return res.json();
                })
                .then(data => {
                    display_verse(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    
        // Proceed with normal logic for other verses
        const nextVerseKey = `${surah}:${verse + 1}`; // Increment the verse by 1
        const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${nextVerseKey}?fields=text_uthmani`;
    
        fetch(apiEndpoint)
            .then(async response => {
                if (response.ok) {
                    return response.json(); // Parse the response as JSON
                } else if (response.status === 404) {
                    // If the next verse does not exist, fetch the first verse of the next Surah
                    const nextSurah = surah + 1;
                    const firstVerseKey = `${nextSurah}:1`; // Get the first verse of the next Surah
                    const firstVerseEndpoint = `https://api.quran.com/api/v4/verses/by_key/${firstVerseKey}?fields=text_uthmani`;
                    const res = await fetch(firstVerseEndpoint);
                    if (!res.ok) {
                        throw new Error('Next Surah not found');
                    }
                    return await res.json();
                } else {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
            })
            .then(data => {


                display_verse(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    previousVerseButton.addEventListener("click", function() {
        if(this_verse_key !== "") {
            previous_verse(this_verse_key);
        }
    });

    function previous_verse(verse_key) {
        const [surah, verse] = verse_key.split(":").map(Number); // Split the verse_key and convert to integers
    
        // Handle the special case for the very first verse
        if (surah === 1 && verse === 1) {
            const lastSurahVerseKey = "114:6"; // Last verse of the last Surah
            const lastSurahEndpoint = `https://api.quran.com/api/v4/verses/by_key/${lastSurahVerseKey}?fields=text_uthmani`;
            
            return fetch(lastSurahEndpoint)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Last verse of Surah 114 not found');
                    }
                    return res.json();
                })
                .then(data => {
                    display_verse(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    
        // Handle decrementing the verse number
        if (verse > 1) {
            const previousVerseKey = `${surah}:${verse - 1}`; // Decrement the verse by 1
            const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${previousVerseKey}?fields=text_uthmani`;
    
            return fetch(apiEndpoint)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok ' + res.statusText);
                    }
                    return res.json(); // Parse the response as JSON
                })
                .then(data => {
                    display_verse(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            // If we are at the first verse of a Surah, go to the last verse of the previous Surah
            const previousSurah = surah - 1;
            
            if (previousSurah >= 1) {
                // Get the last verse number for the previous Surah
                const lastVerseMap = {
                    1: 7,
                    2: 286,
                    3: 200,
                    4: 176,
                    5: 120,
                    6: 165,
                    7: 206,
                    8: 75,
                    9: 129,
                    10: 109,
                    11: 123,
                    12: 111,
                    13: 43,
                    14: 52,
                    15: 99,
                    16: 128,
                    17: 111,
                    18: 110,
                    19: 98,
                    20: 135,
                    21: 112,
                    22: 78,
                    23: 118,
                    24: 64,
                    25: 77,
                    26: 227,
                    27: 93,
                    28: 88,
                    29: 69,
                    30: 60,
                    31: 34,
                    32: 30,
                    33: 73,
                    34: 54,
                    35: 45,
                    36: 83,
                    37: 182,
                    38: 88,
                    39: 75,
                    40: 85,
                    41: 54,
                    42: 53,
                    43: 89,
                    44: 59,
                    45: 37,
                    46: 35,
                    47: 38,
                    48: 29,
                    49: 18,
                    50: 45,
                    51: 60,
                    52: 49,
                    53: 62,
                    54: 55,
                    55: 78,
                    56: 96,
                    57: 29,
                    58: 22,
                    59: 24,
                    60: 13,
                    61: 14,
                    62: 11,
                    63: 11,
                    64: 18,
                    65: 12,
                    66: 12,
                    67: 30,
                    68: 52,
                    69: 52,
                    70: 44,
                    71: 28,
                    72: 28,
                    73: 20,
                    74: 56,
                    75: 40,
                    76: 31,
                    77: 50,
                    78: 40,
                    79: 46,
                    80: 42,
                    81: 29, 
                    82: 19,
                    83: 36,
                    84: 25,
                    85: 22,
                    86: 17,
                    87: 19,
                    88: 26,
                    89: 30,
                    90: 20,
                    91: 15,
                    92: 21,
                    93: 11,
                    94: 8,
                    95: 8,
                    96: 19,
                    97: 5,
                    98: 8,
                    99: 8,
                    100: 11,
                    101: 11,
                    102: 8,
                    103: 3,
                    104: 9,
                    105: 5,
                    106: 4,
                    107: 7,
                    108: 3,
                    109: 6,
                    110: 3,
                    111: 5,
                    112: 4,
                    113: 5,
                    114: 6
                };
    
                const lastVerseCount = lastVerseMap[previousSurah]; // Get the last verse number of the previous Surah
                const previousSurahVerseKey = `${previousSurah}:${lastVerseCount}`; // Create the verse key
    
                const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${previousSurahVerseKey}?fields=text_uthmani`;
    
                return fetch(apiEndpoint)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Previous Surah last verse not found');
                        }
                        return res.json(); // Parse the response as JSON
                    })
                    .then(data => {
                        display_verse(data);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            } else {
                console.error('No previous Surah exists');
            }
        }
    }
    
    
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
