const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentTestimonial = 0;

// Show testimonial by index
function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
        testimonial.classList.remove('active');
    });
    testimonials[index].classList.add('active');
}

// Manual navigation
nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initially show the first testimonial
showTestimonial(currentTestimonial);

// Villas section
let villas = [];
const destinationGrid = document.getElementById("destination-grid");
const searchBar = document.getElementById("search-bar");

// Create a card for each villa
function createCard(villa) {
    const link = document.createElement("a");
    link.href = `property.html?name=${encodeURIComponent(villa.name)}&location=${encodeURIComponent(villa.location)}&price=${villa.price}&rating=${villa.rating}&image=${encodeURIComponent(villa.image)}`;
    link.className = "card";

    link.innerHTML = `
        <img src="${villa.image}" alt="${villa.name}">
        <div class="property-text">
            <h2>${villa.name}</h2>
            <p><strong>Location:</strong> ${villa.location}</p>
            <p><strong>Price:</strong> ₹${villa.price}/night</p>
            <p><strong>Rating:</strong> ⭐ ${villa.rating}</p>
            <p><strong>Amenities:</strong> Free WiFi, Pool, Parking, Air Conditioning</p>
            <p><strong>Availability:</strong> Open all year round</p>
            <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore luxurious amenities, breathtaking views, and unforgettable experiences at this top-rated destination.</p>
            <button style="background-color:#1abc9c; color:#fff; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">Book Now</button>
        </div>
    `;

    return link;
}

// Display a list of villas
function displayVillas(villaList) {
    destinationGrid.innerHTML = "";
    villaList.forEach(villa => {
        destinationGrid.appendChild(createCard(villa));
    });
}

// Filter villas by name based on search input
function filterDestinations() {
    const searchText = searchBar.value.toLowerCase();
    const filtered = villas.filter(villa =>
        villa.name.toLowerCase().includes(searchText)
    );
    displayVillas(filtered);
}

// Attach search input listener
searchBar.addEventListener("input", filterDestinations);

// Fetch villa data from backend and render
fetch('http://localhost:5000/api/villas')
    .then(res => res.json())
    .then(data => {
        villas = data;
        displayVillas(villas);

        // Also render simplified villa list somewhere else
        const container = document.getElementById('villa-list');
        data.forEach(villa => {
            container.innerHTML += `
                <div class="villa-card">
                    <img src="${villa.image}" alt="${villa.name}">
                    <h3>${villa.name}</h3>
                    <p>${villa.location}</p>
                    <p>${villa.price} per night</p>
                    <a href="property.html?id=${villa._id}">View Details</a>
                </div>`;
        });
    });

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Search functionality
    const searchBar = document.getElementById('search-bar');
    const cards = document.querySelectorAll('.card');

    searchBar.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();

        cards.forEach((card) => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('p').textContent.toLowerCase();

            if (name.includes(query) || location.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
