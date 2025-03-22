// Carousel Logic with both Previous and Next buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels
    initCarousel('carousel1', 'indicator1');
    initCarousel('carousel2', 'indicator2');
    initCarousel('carousel3', 'indicator3');
    initCarousel('carousel4', 'indicator4');
    initCarousel('carousel5', 'indicator5');

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const activeCarousel = document.querySelector('.carousel-item.active').closest('.carousel');
            if (activeCarousel) {
                const carouselId = activeCarousel.id;
                const indicatorId = 'indicator' + carouselId.slice(-1);
                showPrevItem(carouselId, indicatorId);
            }
        } else if (e.key === 'ArrowRight') {
            const activeCarousel = document.querySelector('.carousel-item.active').closest('.carousel');
            if (activeCarousel) {
                const carouselId = activeCarousel.id;
                const indicatorId = 'indicator' + carouselId.slice(-1);
                showNextItem(carouselId, indicatorId);
            }
        }
    });
});

function initCarousel(carouselId, indicatorId) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    const indicator = document.getElementById(indicatorId);
    
    // Create indicator dots
    for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToItem(carouselId, indicatorId, i));
        indicator.appendChild(dot);
    }

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextItem(carouselId, indicatorId);
            } else {
                showPrevItem(carouselId, indicatorId);
            }
        }
    }
}

function showNextItem(carouselId, indicatorId) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(indicatorId).querySelectorAll('.indicator-dot');
    
    // Find the current active item
    let currentIndex = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }
    
    // Move to the next item if possible
    if (currentIndex < items.length - 1) {
        // Hide the current item
        items[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // Show the next item
        items[currentIndex + 1].classList.add('active');
        indicators[currentIndex + 1].classList.add('active');
    }
}

function showPrevItem(carouselId, indicatorId) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(indicatorId).querySelectorAll('.indicator-dot');
    
    // Find the current active item
    let currentIndex = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }
    
    // Move to the previous item if possible
    if (currentIndex > 0) {
        // Hide the current item
        items[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // Show the previous item
        items[currentIndex - 1].classList.add('active');
        indicators[currentIndex - 1].classList.add('active');
    }
}

function goToItem(carouselId, indicatorId, index) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(indicatorId).querySelectorAll('.indicator-dot');
    
    // Hide all items
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(dot => dot.classList.remove('active'));
    
    // Show the selected item
    items[index].classList.add('active');
    indicators[index].classList.add('active');
}
