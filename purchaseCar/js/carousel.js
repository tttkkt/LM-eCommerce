document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const content = carousel.querySelector('.carousel-content');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;

        function updateCarousel() {
            content.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        nextBtn.addEventListener('click', showNextSlide);
        prevBtn.addEventListener('click', showPrevSlide);

        // Initial update
        updateCarousel();
    });
});