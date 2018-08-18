'use strict';

// Обертка для слайдов
const mainElement = document.querySelector(`#main`);

// Коды клавиатурных стрелок
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

// Шаблон стрелок
let arrows = `<div class="arrows__wrap"><style>.arrows__wrap {
      position: absolute; 
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;

// Номер приветственного экрана @todo превратить это в словарь экранов
const WELCOME_SCREEN = 1;

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
  let updateSlide = slideUpdateOptions[keyCode];

  if (updateSlide) {
    currentSlide = updateSlide(currentSlide);
    switchSlide(currentSlide);
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

// Показываем стрелки
const showArrows = () => {
  // Вставляем контейнер со стрелками в разметку
  document.body.insertAdjacentHTML(`beforeend`, arrows);

  // Ищем стрелки
  arrows = document.querySelectorAll(`.arrows__btn`);

  // Устанавливаем айдишники, равные кодам стрелок на клавиатуре
  arrows[0].setAttribute(`id`, LEFT_ARROW);
  arrows[1].setAttribute(`id`, RIGHT_ARROW);
};

const addListeners = () => {
  // Вешаем обработчик нажатия с клавиатуры
  document.addEventListener(`keydown`, onKeyPress);

  // Вешаем обработчики на стрелки
  arrows.forEach((arrow) => arrow.addEventListener(`click`, onArrowClick));
};

/**
 * Обрабатываем нажатие с клавиатуры и переключаем слайды
 * @param {KeyboardEvent} evt код нажатой клавиши
 * @see https://developer.mozilla.org/ru/docs/Web/Events
 */
const onKeyPress = (evt) => {
  updateCurrentSlide(evt.keyCode);
};

const onArrowClick = (evt) => {
  const keyCode = Number(evt.target.getAttribute(`id`));

  updateCurrentSlide(keyCode);
};

showArrows(); // Вставляем стрелки
addListeners(); // Вешаем обработчики
switchSlide(currentSlide); // По умолчанию показываем нулевой слайд
