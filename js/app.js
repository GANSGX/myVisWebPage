const text = "GansGX GitHub"; // Текст для печаталки
const typewriterElement = document.getElementById("typewriter");

let index = 0;

function type() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 400); // Задержка между печатью символов
    } else {
        setTimeout(erase, 1500); // Задержка перед стиранием
    }
}

function erase() {
    if (index > 0) {
        typewriterElement.innerHTML = text.substring(0, index - 1);
        index--;
        setTimeout(erase, 400); // Задержка между стиранием символов
    } else {
        index = 0; // Сброс индекса
        type(); // Начинаем печатать заново
    }
}

// Запускаем анимацию после загрузки страницы
window.onload = () => {
    typewriterElement.classList.remove("hidden"); // Показываем текст
    type();
};




let currentSlide = 1;
const totalSlides = 3;

// Обработчик кликов на индикаторы
document.querySelectorAll('.indicator').forEach(indicator => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        changeSlide(slideIndex);
    });
});

// Обработчик кликов на ссылки навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке
        const slideIndex = parseInt(link.getAttribute('data-slide'));
        changeSlide(slideIndex);
    });
});

function changeSlide(slideIndex) {
    const currentSlideElement = document.querySelector(`.swiper-slide-${currentSlide}`);
    const newSlideElement = document.querySelector(`.swiper-slide-${slideIndex}`);

    // Добавляем класс fade-out к текущему слайду
    currentSlideElement.classList.add('fade-out');

    // Ждем завершения анимации fade-out, затем переключаем слайд
    currentSlideElement.addEventListener('animationend', function handleAnimationEnd() {
        // Убираем активный класс с текущего слайда и индикатора
        currentSlideElement.classList.remove('active', 'fade-out');
        currentSlideElement.removeEventListener('animationend', handleAnimationEnd); // Убираем обработчик события

        // Переключаем на новый слайд
        currentSlide = slideIndex;
        newSlideElement.classList.add('active', 'fade-in');

        // Убираем активный класс у всех индикаторов
        document.querySelectorAll('.indicator').forEach(indicator => {
            indicator.classList.remove('active-1', 'active-2', 'active-3');
        });

        // Устанавливаем активный класс для текущего индикатора
        const activeIndicator = document.querySelector(`.indicator[data-slide="${currentSlide}"]`);
        activeIndicator.classList.add(`active-${currentSlide}`);

        // После добавления класса fade-in удаляем его после завершения анимации
        newSlideElement.addEventListener('animationend', function() {
            newSlideElement.classList.remove('fade-in');
        });
    });
}

// Устанавливаем первый индикатор и слайд активными по умолчанию
document.querySelector('.indicator[data-slide="1"]').classList.add('active-1');
document.querySelector(`.swiper-slide-${currentSlide}`).classList.add('active');

