document.addEventListener("DOMContentLoaded", function () {
    // Get references to navigation buttons
    const nextVerseButton = document.getElementById("next-verse");
    const previousVerseButton = document.getElementById("prev-verse");

    // Event listener for the next word button
    document.getElementById("next-word").addEventListener("click", function () {
        var originalWords = this_verse.split(' ');
        var trimmedWords = this_verse_trimmed.replace("... ", "").split(' ');
        var arabicNumeralRegex = /[\u0660-\u0669]$/;
        if (trimmedWords.length < originalWords.length) {
            trimmedWords.push(originalWords[trimmedWords.length]);
            this_verse_trimmed = trimmedWords.join(' ');
            var trimmedLastWord = this_verse_trimmed.trim();
            if (!this_verse_trimmed.includes("...") && trimmedWords.length > 1) {
                if (!arabicNumeralRegex.test(trimmedLastWord[trimmedLastWord.length - 1])) {
                    this_verse_trimmed = "... " + this_verse_trimmed;
                }
            }
            verseLabel.textContent = this_verse_trimmed;
        }
    });

    // Event listener for the show verse button
    document.getElementById("show-verse").addEventListener("click", function () {
        const currentVerseLabel = verseLabel.textContent;
        function clickNextWord() {
            document.getElementById("next-word").click();
            if (verseLabel.textContent !== currentVerseLabel) {
                clickNextWord();
            }
        }
        clickNextWord();
    });

    // Event listener for the previous word button
    document.getElementById("prev-word").addEventListener("click", function () {
        if (verseLabel.textContent === "[Apply a filter(s) and click Generate Verse]") {
            return;
        }
        var trimmedWords = this_verse_trimmed.replace("... ", "").split(' ');
        if (trimmedWords.length > 0) {
            trimmedWords.pop();
        }
        this_verse_trimmed = trimmedWords.join(' ');
        this_verse_trimmed = this_verse_trimmed ? "... " + this_verse_trimmed : "...";
        verseLabel.textContent = this_verse_trimmed;
    });

    // Event listener for the next verse button
    nextVerseButton.addEventListener("click", function () {
        if (this_verse_key !== "") {
            next_verse(this_verse_key);
        }
    });

    // Function to fetch and display the next verse
    function next_verse(verse_key) {
        const [surah, verse] = verse_key.split(":").map(Number);
        if (surah === 114 && verse === 6) {
            const firstVerseKey = "1:1";
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
        const nextVerseKey = `${surah}:${verse + 1}`;
        const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${nextVerseKey}?fields=text_uthmani`;

        fetch(apiEndpoint)
            .then(async response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    const nextSurah = surah + 1;
                    const firstVerseKey = `${nextSurah}:1`;
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

    // Event listener for the previous verse button
    previousVerseButton.addEventListener("click", function () {
        if (this_verse_key !== "") {
            previous_verse(this_verse_key);
        }
    });

    // Function to fetch and display the previous verse
    function previous_verse(verse_key) {
        const [surah, verse] = verse_key.split(":").map(Number);
        if (surah === 1 && verse === 1) {
            const lastSurahVerseKey = "114:6";
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
        if (verse > 1) {
            const previousVerseKey = `${surah}:${verse - 1}`;
            const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${previousVerseKey}?fields=text_uthmani`;
            return fetch(apiEndpoint)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok ' + res.statusText);
                    }
                    return res.json();
                })
                .then(data => {
                    display_verse(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            const previousSurah = surah - 1;
            if (previousSurah >= 1) {
                const lastVerseMap = {
                    1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109, 11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11, 101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3, 111: 5, 112: 4, 113: 5, 114: 6
                };
                const lastVerseNumber = lastVerseMap[previousSurah];
                const previousSurahVerseKey = `${previousSurah}:${lastVerseNumber}`;
                const apiEndpoint = `https://api.quran.com/api/v4/verses/by_key/${previousSurahVerseKey}?fields=text_uthmani`;

                fetch(apiEndpoint)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok ' + res.statusText);
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
        }
    }

});
