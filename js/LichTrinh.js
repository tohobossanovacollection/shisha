document.addEventListener("DOMContentLoaded", function () {
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const tripItems = document.querySelectorAll(".trip-item");

    function filterTrips() {
        const fromValue = fromSelect.value;
        const toValue = toSelect.value;

        tripItems.forEach((trip) => {
        const route = trip.querySelector(".trip-route").textContent;
        const [fromRoute, toRoute] = route.split(" → ").map((place) => place.trim());

        const matchesFrom = !fromValue || fromRoute === fromValue;
        const matchesTo = !toValue || toRoute === toValue;

        if (matchesFrom && matchesTo) {
            trip.style.display = "flex";
        } else {
            trip.style.display = "none";
        }
        });
    }

    fromSelect.addEventListener("change", filterTrips);
    toSelect.addEventListener("change", filterTrips);
});
