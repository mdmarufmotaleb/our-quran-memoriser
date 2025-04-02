document.addEventListener("DOMContentLoaded", function () {
    const sepiaBtn = document.getElementById("sepia-btn");
    const lightBtn = document.getElementById("light-btn");
    const darkBtn = document.getElementById("dark-btn");

    sepiaBtn.addEventListener("click", function () {
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add("sepia-theme");
    });

    lightBtn.addEventListener("click", function () {
        document.body.classList.remove("sepia-theme", "dark-theme");
        document.body.classList.add("light-theme");
    });

    darkBtn.addEventListener("click", function () {
        document.body.classList.remove("sepia-theme", "light-theme");
        document.body.classList.add("dark-theme");
    });
});