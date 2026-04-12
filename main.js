const serviceContainer = document.querySelector(".services-card-container");
const trial = document.querySelector(".service-section-h");
const heroTitle = document.getElementById('hero-section-title');
let text = 'BRING ALL OF YOUR IDEAS TO LIFE';
let i = 0;
const speed = 100;
heroTitle.textContent = '';


console.log(heroTitle.getHTML());
// heroTitle.textContent = text;

function updateHeroTitle() {
    if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;

        setTimeout(updateHeroTitle, speed);
    }
}

window.onload = updateHeroTitle;