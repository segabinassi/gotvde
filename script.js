const header = document.getElementById('siteHeader');
const revealElements = document.querySelectorAll('.reveal, .reveal-card');

const handleScrollHeader = () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

const handleReveal = () => {
    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = windowHeight - 80;

        if (elementTop < revealPoint) {
            element.classList.add('visible');
            // element.style.animationDelay = `${index * 0.08}s`;
        }
    });
};

const throttle = (fn, wait) => {
    let lastTime = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn(...args);
            lastTime = now;
        }
    };
};

window.addEventListener('scroll', throttle(() => {
    handleScrollHeader();
    handleReveal();
}, 80));

// Carrossel da frota
const fleetGrid = document.getElementById('fleetGrid');
const fleetPrevBtn = document.getElementById('fleetPrevBtn');
const fleetNextBtn = document.getElementById('fleetNextBtn');

if (fleetGrid && fleetPrevBtn && fleetNextBtn) {
    const scrollAmount = 376; // card width (340px) + gap (1.5rem = 24px) + padding

    const updateButtonStates = () => {
        const scrollLeft = fleetGrid.scrollLeft;
        const scrollWidth = fleetGrid.scrollWidth;
        const clientWidth = fleetGrid.clientWidth;

        fleetPrevBtn.disabled = scrollLeft <= 0;
        fleetNextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 10;
    };

    fleetPrevBtn.addEventListener('click', () => {
        fleetGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    fleetNextBtn.addEventListener('click', () => {
        fleetGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    fleetGrid.addEventListener('scroll', updateButtonStates);
    window.addEventListener('load', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);
}

window.addEventListener('load', () => {
    handleReveal();
    handleScrollHeader();
});
