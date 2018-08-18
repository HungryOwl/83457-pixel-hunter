// Обертка для слайдов
const mainElement = document.querySelector(`#main`);

// Номер приветственного экрана @todo превратить это в словарь экранов
let WELCOME_SCREEN = 1;

// Текущий слайд
let currentSlide = WELCOME_SCREEN;

/**
 * Показываем нужный слайд
 * @param {HTMLElement} element дом нода со всем содержимым текущего слайда
 */
const showSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

/**
 * Увеличиваем номер текущего слайда
 * @param {number} index номер предыдущего слайда
 * @return {number} номер текущего слайда
 */
const increaseSlide = (index) => {
  return (index >= slides.length - 1) ? 0 : index + 1;
};

/**
 * Уменьшаем номер текущего слайда
 * @param {number} index номер предыдущего слайда
 * @return {number} номер текущего слайда
 */
const decreaseSlide = (index) => {
  return (index <= 0) ? slides.length - 1 : index - 1;
};

// Соответствие кода клавиши нужному методу обновления номера текущего слайда
const slideUpdateOptions = {
  "39": increaseSlide,
  "37": decreaseSlide
};

/**
 * Обновляем текущий слайд
 * @param {number} keyCode код нажатой клавиши
 */
const updateCurrentSlide = (keyCode) => {
  for (let key in slideUpdateOptions) {
    if (keyCode === Number(key)) {
      currentSlide = slideUpdateOptions[keyCode](currentSlide);
      switchSlide(currentSlide);
    }
  }
};

// Собираем игровые экраны
const slides = Array.from(document.querySelectorAll(`template`)).
  map((it) => it.content);

/**
 * Переключаем слайды на игровом экране
 * @param {number} index номер текущего слайда
 */
const switchSlide = (index) => {
  showSlide(slides[index]);
};

/**
 * Обрабатываем нажатие с клавиатуры и переключаем слайды
 * @param {KeyboardEvent} evt код нажатой клавиши
 * @see https://developer.mozilla.org/ru/docs/Web/Events
 */
const onKeyPress = (evt) => {
  updateCurrentSlide(evt.keyCode);
};

// Вешаем обработчик нажатия с клавиатуры
document.addEventListener(`keydown`, onKeyPress);

// По умолчанию показываем нулевой слайд
switchSlide(currentSlide);
