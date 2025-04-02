document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const generateButton = document.getElementById("generate-verse");
    const verseLabel = document.getElementById("verse-text");
    const thisPage = document.getElementById("current-page");
    const thisSurah = document.getElementById("current-surah");
    const thisJuz = document.getElementById("current-juz");
    const thisRub = document.getElementById("current-rub");

    // Event listener for the generate verse button
    generateButton.addEventListener("click", generate_verse);

    // Function to generate a random verse based on filters
    function generate_verse() {
        // ... (Generate verse logic - same as before) ...
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
        min_rub = minRubElement ? parseInt(minRubElement.value) : 1;
        max_rub = maxRubElement ? parseInt(maxRubElement.value) : 240;
        min_rub = isNaN(min_rub) ? 1 : min_rub;
        max_rub = isNaN(max_rub) ? 240 : max_rub;

        var page_number = Math.floor(Math.random() * (max_page - min_page + 1)) + min_page;
        var surah_number = Math.floor(Math.random() * (max_surah - min_surah + 1)) + min_surah;
        var juz_number = Math.floor(Math.random() * (max_juz - min_juz + 1)) + min_juz;
        var rub_number = Math.floor(Math.random() * (max_rub - min_rub + 1)) + min_rub;

        var filters = [];
        if (min_page_set || max_page_set) {
            filters.push("page_set");
        }
        if (min_surah_set || max_surah_set) {
            filters.push("surah_set");
        }
        if (min_juz_set || max_juz_set) {
            filters.push("juz_set");
        }
        if (min_rub_set || max_rub_set) {
            filters.push("rub_set");
        }

        var apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani`;
        if (filters.length > 0) {
            var chosen_filter_index = Math.floor(Math.random() * filters.length) + 1;
            var chosen_filter = filters[chosen_filter_index - 1];

            if (chosen_filter === "page_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&page_number=${page_number}`;
            }
            if (chosen_filter === "surah_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&chapter_number=${surah_number}`;
            }
            if (chosen_filter === "juz_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&juz_number=${juz_number}`;
            }
            if (chosen_filter === "rub_set") {
                apiEndpoint = `https://api.quran.com/api/v4/verses/random?fields=text_uthmani&rub_el_hizb_number=${rub_number}`;
            }
        }

        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                display_verse(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                verseLabel.textContent = "Error fetching verse";
            });
    }

    // Function to display the fetched verse
    function display_verse(data) {
        // ... (Display verse logic - same as before) ...
        this_verse = data.verse.text_uthmani;
        this_verse_key = data.verse.verse_key;
        this_verse = add_verse_number(this_verse, this_verse_key);
        this_verse_trimmed = this_verse_3_words(this_verse);
        this_verse_trimmed = remove_hizb_symbol(this_verse_trimmed);
        verseLabel.textContent = this_verse_trimmed;
        var this_page = data.verse.page_number;
        var this_surah = parseInt(String(this_verse_key).match(/^(\d+):/)[1], 10);
        var this_juz = data.verse.juz_number;
        var this_rub = data.verse.rub_el_hizb_number;
        thisPage.textContent = this_page;
        thisSurah.textContent = this_surah;
        thisJuz.textContent = this_juz;
        thisRub.textContent = this_rub;
    }

    // Function to add verse number to the verse text
    function add_verse_number(this_verse, this_verse_key) {
        // ... (Add verse number logic - same as before) ...
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

    // Function to trim the verse to the first 3 words
    function this_verse_3_words(this_verse) {
        // ... (Trim verse logic - same as before) ...
        var words = this_verse.split(' ');
        var first_3_words = words.slice(0, 3).join(' ');
        var trimmedLastWord = first_3_words.trim();
        var arabicNumeralRegex = /[\u0660-\u0669]$/;
        if (!arabicNumeralRegex.test(trimmedLastWord[trimmedLastWord.length - 1])) {
            return "... " + first_3_words;
        }
        return first_3_words;
    }

    // Function to remove the hizb symbol from the verse
    function remove_hizb_symbol(this_verse) {
        // ... (Remove hizb symbol logic - same as before) ...
        if (this_verse.includes("۞")) {
            return this_verse.replace(/۞/g, "");
        } else {
            return this_verse;
        }
    }
});