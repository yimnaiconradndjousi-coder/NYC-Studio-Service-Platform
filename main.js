// 1. SELECT ELEMENTS
const heroTitle = document.getElementById('hero-section-title');
const addServiceTitle = document.getElementById('service-title');
const addServiceDescription = document.getElementById('service-description');
const addServiceButton = document.getElementById('add-project-btn');
const serviceContainer = document.querySelector(".services-card-container");

// --- LOGIC FOR ADMIN PAGE ---
if (addServiceButton) {
    addServiceButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create an object for the new service
        const newService = {
            title: addServiceTitle.value,
            description: addServiceDescription.value
        };

        // Get existing services from localStorage or start an empty array
        const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
        
        // Add new service to the list and save back to localStorage
        savedServices.push(newService);
        localStorage.setItem('myServices', JSON.stringify(savedServices));

        alert("Service added! Check the Home page.");
        addServiceTitle.value = '';
        addServiceDescription.value = '';
    });
}

// --- LOGIC FOR HOME PAGE ---
if (heroTitle) {
    // Typing Effect Logic
    const speed = 100;
    let text = 'BRING ALL OF YOUR IDEAS TO LIFE WITH US';
    let i = 0;
    heroTitle.textContent = '';

    function updateHeroTitle() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(updateHeroTitle, speed);
        }
    }
    updateHeroTitle();
}

// --- LOAD SAVED SERVICES ON HOME PAGE ---
if (serviceContainer) {
    const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
    
    savedServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `<h2>${service.title}</h2><p>${service.description}</p>`;
        serviceContainer.appendChild(serviceCard);
    });

    window.reload = function() {
        location.reload();
    }
}
