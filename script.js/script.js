let sortAsc = true; // Variabele om de sorteervolgorde bij te houden

// Dit is hoe de data wordt weergeven in de site. De url geeft aan wat voor data  (auto/ moter info) er wordt geladen. Bij home wordt alles geladen.
let carousel;

if (window.location.pathname.includes("home.html")) {
    carousel = []
    // spreid de motercyles array zodat het gebruikt mag worden in de push functie
    carousel.push(...cars)
} else if (window.location.pathname.includes("motorcycles.html")) {
    carousel = motorcycles;
} else if (window.location.pathname.includes("high-end.html")) {
    carousel = highend;
} else if (window.location.pathname.includes("offroad.html")) {
    carousel = offroad;
} else if (window.location.pathname.includes("special.html")) {
    carousel = special;
} else{
    console.log("verkeerde pagina!")
}

// User story 1: Auto's filteren op land
function displaycarousel(selectedCountry, showFavorites) {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';

    let filteredcarousel = getSortedcarousel(selectedCountry, showFavorites);

    filteredcarousel.forEach((car, index) => {
        const carBox = document.createElement('div');
        carBox.className = 'car-box col-md-4 mb-3';
        carBox.innerHTML = `
            <div class="image-box">
                <img src="${car.image}" class="car-image" alt="${car.name}" onclick="openCarDetailsModal(${index})">
            </div>
            <div class="car-details">
                <h5>${car.name}</h5>
                <button type="button" class="btn btn-info view-details" data-car-index="${index}" onclick="openCarDetailsModal(${index})">
                    $${car.price.toLocaleString()}
                </button>
                <i class="favorite-icon ${car.favorite ? 'fas' : 'far'} fa-heart"></i>
            </div>
        `;

        const favoriteIcon = carBox.querySelector('.favorite-icon');

        favoriteIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Voorkom dat het modale venster wordt geopend wanneer het hart wordt geklikt
            car.favorite = !car.favorite;
            favoriteIcon.classList.toggle('fas');
            favoriteIcon.classList.toggle('far');
        });

        carList.appendChild(carBox);
    });
}

// User story 2: Favoriete Hypercarousel markeren
function getSortedcarousel(selectedCountry, showFavorites) {
    let filteredcarousel = carousel.filter((car) =>
        (selectedCountry === 'all' || car.country === selectedCountry) &&
        (!showFavorites || car.favorite)
    );

    // User story 3: Auto's sorteren op prijs
    filteredcarousel.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    return filteredcarousel;
}

// User story 4: Details van voertuigen bekijken
function updateCarDetails(index) {
    const carDetailsContainer = document.getElementById('carDetails');
    const selectedCar = carousel[index];

    const carDetails = document.createElement('div');
    carDetails.className = 'car-details col-md-12';
    carDetails.innerHTML = `
        <h2>${selectedCar.name}</h2>
        <div class="row">
            <div class="col-md-6">
                <img src="${selectedCar.image}" class="car-image" alt="${selectedCar.name}">
            </div>
            <div class="col-md-6">
                <p>Price: $${selectedCar.price.toLocaleString()}</p>
                <p>Country: ${selectedCar.country}</p>
                <p>${selectedCar.favorite ? 'This car is a favorite!' : 'Not a favorite'}</p>
                <p>Some additional information about the car...</p>
            </div>
        </div>
    `;

    carDetailsContainer.innerHTML = '';
    carDetailsContainer.appendChild(carDetails);
}

// Afhandeling van formulierindiening
const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    displaycarousel(selectedCountry, showFavorites);
});

// Initiële weergave van alle auto's
displaycarousel('all', false);

// Sorteerknop functionaliteit
const sortPriceBtn = document.getElementById('sortPriceBtn');
sortPriceBtn.addEventListener('click', () => {
    sortAsc = !sortAsc;
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    displaycarousel(selectedCountry, showFavorites);
});

// Navigatiefunctie
function navigateToPage(page) {
    window.location.href = page;
}

// Open modale inhoud
function openCarDetailsModal(index) {
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    const sortedcarousel = getSortedcarousel(selectedCountry, showFavorites);

    const selectedCar = sortedcarousel[index];
    if (!selectedCar) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${selectedCar.name}</h2>
        <div class="row">
            <div class="col-md-6">
                <img src="${selectedCar.image}" class="car-image" alt="${selectedCar.name}">
            </div>
            <div class="col-md-6">
                <p>Price: $${selectedCar.price.toLocaleString()}</p>
                <p>Country: ${selectedCar.country}</p>
                <p>${selectedCar.favorite ? 'This car is a favorite!' : 'Not a favorite'}</p>
                <p>Some additional information about the car...</p>
            </div>
        </div>
    `;

    const modal = document.getElementById('carDetailsModal');
    modal.style.display = 'block';
}

// Modale venster sluiten
function closeCarDetailsModal() {
    const modal = document.getElementById('carDetailsModal');
    modal.style.display = 'none';
}

// Sluit modale venster bij klikken buiten het venster
window.onclick = function (event) {
    const modal = document.getElementById('carDetailsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
