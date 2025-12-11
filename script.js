document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. FUNCIONALIDADE DO CARROSSEL
    // ----------------------------------------------------------------
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    function updateCarousel() {
        // Calcula o offset (deslocamento) necessário em porcentagem
        const offset = -currentIndex * (100 / totalSlides);
        carouselContainer.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Criação dos Pontos de Navegação
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoSlide(); // Reinicia o tempo ao clicar
            });
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            // Marca o ponto ativo
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Configuração do Auto-Slide (7 segundos)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 7000); 
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event Listeners para botões do Carrossel
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Inicialização
    createDots();
    startAutoSlide();
});