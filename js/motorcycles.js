    // Voorbeeld autogegevens (vervang dit door je eigen gegevens)
    const cars = [
        { name: 'Energica Ego+RS', price: 3311090, image: '../img/Energica.jpg', country: 'Italy', favorite: false },
        { name: 'suzuki gsx1300r', price: 19599, image: '../img/Suzuki.jpg', country: 'Japan', favorite: true },
        { name: 'Honda Fireblade', price: 300000, image: '../img/Fireblade.jpg', country: 'Japan', favorite: false },
        { name: 'Kawasaki Ninja H2R', price: 56400, image: '../img/kawasaki.jpg', country: 'Japan', favorite: false },
        { name: 'Ducati Panigale', price: 47690, image: '../img/Ducati.jpg', country: 'Italy', favorite: true },
        { name: 'BMW M 1000 R', price: 1100000, image: '../img/bmw.jpg', country: 'Germany', favorite: false },
    ];

    let sortAsc = true; // Variabele om de sorteervolgorde bij te houden

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

            favoriteIcon.addEventListener('click', (event) =>

{
                event.stopPropagation(); // Voorkom dat het modale venster wordt geopend wanneer het hart wordt geklikt
                car.favorite = !car.favorite;
                favoriteIcon.classList.toggle('fas');
                favoriteIcon.classList.toggle('far');
            });

            carList.appendChild(carBox);
        });

    }

    // Functie om de auto's te sorteren op prijs
    function getSortedCars(selectedCountry, showFavorites) {
        let filteredCars = cars.filter((car) =>
            (selectedCountry === 'all' || car.country === selectedCountry) &&
            (!showFavorites || car.favorite)
        );

        // Sorteer de auto's op prijs
        filteredCars.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

        return filteredCars;
    }

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
                    <p>${selectedCar.favorite ? 'This motorcycle is a favorite!' : 'Not a favorite'}</p>
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