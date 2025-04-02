document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables for filter ranges
    var min_page = 1;
    var max_page = 604;
    var min_surah = 1;
    var max_surah = 114;
    var min_juz = 1;
    var max_juz = 30;
    var min_rub = 1;
    var max_rub = 240;

    // Initialize flags to track if filters are set
    var min_page_set = false;
    var min_surah_set = false;
    var min_juz_set = false;
    var min_rub_set = false;
    var max_page_set = false;
    var max_surah_set = false;
    var max_juz_set = false;
    var max_rub_set = false;

    // Get references to filter input elements
    const minPageElement = document.getElementById("min-page");
    const maxPageElement = document.getElementById("max-page");
    const minSurahElement = document.getElementById("min-surah");
    const maxSurahElement = document.getElementById("max-surah");
    const minJuzElement = document.getElementById("min-juz");
    const maxJuzElement = document.getElementById("max-juz");
    const minRubElement = document.getElementById("min-rub");
    const maxRubElement = document.getElementById("max-rub");

    // Event listeners for filter input changes
    minPageElement.addEventListener("change", function () {
        // ... (Filter input validation logic - same as before) ...
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
        // ... (Filter input validation logic - same as before) ...
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
        // ... (Filter input validation logic - same as before) ...
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
        // ... (Filter input validation logic - same as before) ...
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
        // ... (Filter input validation logic - same as before) ...
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
        // ... (Filter input validation logic - same as before) ...
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

    minRubElement.addEventListener("change", function () {
        // ... (Filter input validation logic - same as before) ...
        if (minRubElement.value.trim() === "") {
            min_rub = "";
            min_rub_set = false;
        } else {
            min_rub = parseInt(minRubElement.value);
            min_rub_set = true;
        }

        if (min_rub !== "") {
            if (min_rub < 1) {
                min_rub = 1;
            }
            if (min_rub > 240) {
                min_rub = 30;
            }
            if (min_rub > max_rub) {
                min_rub = max_rub;
            }
        }
        minRubElement.value = min_rub;
    });

    maxRubElement.addEventListener("change", function () {
        // ... (Filter input validation logic - same as before) ...
        if (maxRubElement.value.trim() === "") {
            max_rub = "";
            max_rub_set = false;
        } else {
            max_rub = parseInt(maxRubElement.value);
            max_rub_set = true;
        }

        if (max_rub !== "") {
            if (max_rub > 240) {
                max_rub = 240;
            }
            if (max_rub < 1) {
                max_rub = 1;
            }
            if (max_rub < min_rub) {
                max_rub = min_rub;
            }
        }

        maxRubElement.value = max_rub;
    });

    // Toggle filters visibility
    const filtersToggle = document.getElementById("filters-toggle");
    const filtersContent = document.getElementById("filters-content");

    filtersToggle.addEventListener("click", function () {
        filtersContent.classList.toggle("show");
    });
});