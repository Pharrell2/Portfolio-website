


// Voorbeeld autogegevens (vervang dit door je eigen gegevens)
 const cars = [
    { name: 'Ferrari 488', price: 250000, image: 'ferrari_488.jpg', country: 'Italy', favorite: false },
    { name: 'Lamborghini Aventador ', price: 280000, image: 'Lamborghini-Huracan.jpg', country: 'Italy', favorite: true },
    { name: 'Aston Martin ', price: 3000000, image: 'Aston-Martin-Valkyrie.jpg', country: 'UK', favorite: false },
    { name: 'Bugatti  Veyron ', price: 1900000, image: 'bugatti-veyron.jpg', country: 'France', favorite: false },
    { name: 'Koenigsegg Agera', price: 1500000, image: 'koenigsegg.jpg', country: 'Sweden', favorite: true },
    { name: 'McLaren P1', price: 1100000, image: 'McLaren_P1.jpg', country: 'UK', favorite: false },
];

let sortAsc = true; // Variabele om de sorteervolgorde bij te houden

// User story 1: Auto's filteren op land
// Functie om auto's weer te geven op basis van het filter
function displayCars(selectedCountry, showFavorites) {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';

    let filteredCars = getSortedCars(selectedCountry, showFavorites);

    filteredCars.forEach((car, index) => {
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
// User story 2: Favoriete Hypercars markeren
// Toggle tussen favorieten en niet-favorieten
function getSortedCars(selectedCountry, showFavorites) {
    let filteredCars = cars.filter((car) =>
        (selectedCountry === 'all' || car.country === selectedCountry) &&
        (!showFavorites || car.favorite)
    );

   // User story 3: Auto's sorteren op prijs
// Sorteer de auto's op prijs bij klikken op de button
    filteredCars.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    return filteredCars;
}
// User story 4: Details van voertuigen bekijken
// Functie om de inhoud van het auto-details bij te werken
function updateCarDetails(index) {
    const carDetailsContainer = document.getElementById('carDetails');
    const selectedCar = cars[index];

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

    // Clear previous car details
    carDetailsContainer.innerHTML = '';
    carDetailsContainer.appendChild(carDetails);
}

// Afhandeling van formulierindiening
const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    displayCars(selectedCountry, showFavorites);
});

// Initiële weergave van alle auto's
displayCars('all', false);

// Voeg event listener toe voor Sorteer op prijs-knop
const sortPriceBtn = document.getElementById('sortPriceBtn');
sortPriceBtn.addEventListener('click', () => {
    sortAsc = !sortAsc; // Wissel sorteervolgorde
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    displayCars(selectedCountry, showFavorites);
});

// Functie om naar andere pagina's te navigeren
function navigateToPage(page) {
    window.location.href = page;
}

// Functie om de modale inhoud met autogegevens te openen
function openCarDetailsModal(index) {
    // Haal de gesorteerde auto's op
    const selectedCountry = document.getElementById('country').value;
    const showFavorites = document.getElementById('favorites').checked;
    const sortedCars = getSortedCars(selectedCountry, showFavorites);

    const selectedCar = sortedCars[index];

    // Vul de modale inhoud met autogegevens
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

    // Open de modale inhoud
    const modal = document.getElementById('carDetailsModal');
    modal.style.display = 'block';
}

// Functie om het modale venster te sluiten
function closeCarDetailsModal() {
    const modal = document.getElementById('carDetailsModal');
    modal.style.display = 'none';
}

// Sluit het modale venster als de gebruiker buiten het venster klikt
window.onclick = function (event) {
    const modal = document.getElementById('carDetailsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Functionaliteit om het aanmeldingsformulier te tonen
const showSignupFormLink = document.getElementById('showSignupForm');
const signupFormContainer = document.getElementById('signupForm');
showSignupFormLink.addEventListener('click', function (e) {
    e.preventDefault();
    signupFormContainer.style.display = 'block';
});

// Functionaliteit om het aanmeldingsformulier te verbergen wanneer op de achtergrond wordt geklikt
window.onclick = function (event) {
    if (event.target === signupFormContainer) {
        signupFormContainer.style.display = 'none';
    }
};

// Functionaliteit voor het verwerken van het aanmeldingsformulier
const signupForm = document.getElementById('signupFormContent');
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Verwerk hier het formulier, bijvoorbeeld door gegevens naar een server te verzenden
    // En stuur dan de verificatie-e-mail naar het opgegeven e-mailadres
    const email = document.getElementById('email').value;
    // Voer hier de logica uit om de verificatie-e-mail te verzenden
    console.log('Verificatie-e-mail verzonden naar:', email);
    // Verberg het formulier na verwerking
    //signupFormContainer.style.display = 'none';
});

