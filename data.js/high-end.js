 // Voorbeeld autogegevens (vervang dit door je eigen gegevens)
 const cars = [
    { name: 'Austin Sheerline', price: 59950, image: '../img/Austin Sheerline.jpg', country: 'UK', favorite: false },
    { name: 'Rolls royce phantom ', price: 562769, image: '../img/rolls-royce-phantom.webp', country: 'UK', favorite: true },
    { name: 'Packard Eight ', price: 110725, image: '../img/Packard.jpeg', country: 'UK', favorite: false },
    { name: 'Bugatti ', price: 1900000, image: '../img/bugatti-veyron.jpg', country: 'France', favorite: false },
    { name: 'Koenigsegg', price: 1500000, image: '../img/koenigsegg.jpg', country: 'Sweden', favorite: true },
    { name: 'McLaren P1', price: 1100000, image: '../img/McLaren_P1.jpg', country: 'UK', favorite: false },
];

let sortAsc = true; // Variabele om de sorteervolgorde bij te houden

// Functie om auto's weer te geven op basis van het filter
function displayCars(selectedCountry, showFavorites) {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';

    let filteredCars = cars.filter((car) =>
        (selectedCountry === 'all' || car.country === selectedCountry) &&
        (!showFavorites || car.favorite)
    );

    // Sorteer de auto's op prijs
    filteredCars.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    filteredCars.forEach((car, index) => {
        const carBox = document.createElement('div');
        carBox.className = 'car-box col-md-4 mb-3';
        carBox.innerHTML = `
            <div class="image-box">
                <img src="${car.image}" class="car-image" alt="${car.name}">
            </div>
            <div class="car-details">
                <h5>${car.name}</h5>
                <p>$${car.price.toLocaleString()}</p>
                <button type="button" class="btn btn-info view-details" data-bs-toggle="modal" data-bs-target="#carModal" data-car-index="${index}">View Details</button>
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

// Functie om de inhoud van het modale venster bij te werken
function updateModalContent(index) {
    const modalCarImage = document.querySelector('.modal-car-image');
    const modalCarName = document.querySelector('.modal-car-name');
    const modalCarPrice = document.querySelector('.modal-car-price');
    const modalCarCountry = document.querySelector('.modal-car-country');

    modalCarImage.src = cars[index].image;
    modalCarName.textContent = cars[index].name;
    modalCarPrice.textContent = `$${cars[index].price.toLocaleString()}`;
    modalCarCountry.textContent = `Country: ${cars[index].country}`;
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

// Voeg event listener toe voor het openen van het modale venster
const carModal = new bootstrap.Modal(document.getElementById('carModal'));
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details')) {
        const index = e.target.dataset.carIndex;
        updateModalContent(index);
        carModal.show();
    }
});