import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #slider = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#createSlider();
  }

  #createSlider(){
    this.#slider = createElement(this.#template());
    this.#slider.querySelector('.slider__thumb').addEventListener('pointerdown', this.#onStepsDragAndDrop);
    this.#slider.addEventListener('click', this.#onStepsClick);
  }

  #onStepsDragAndDrop = (event) => {
    let thumb = this.#slider.querySelector('.slider__thumb');
    let progress = this.#slider.querySelector('.slider__progress');
    let segments = this.steps - 1;

    thumb.ondragstart = (event) => {
      event.preventDefault();
    };

    const onMove = (event) => {
      this.#slider.classList.add('slider_dragging');

      let left = event.clientX - this.#slider.getBoundingClientRect().left;
      let leftRelative = left / this.#slider.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);

      this.#slider.querySelector(".slider__value").innerText = this.value;

      this.#slider.querySelectorAll('.slider__step').forEach((item) => {
          if(item.classList.contains('slider__step-active')){
                  item.classList.remove('slider__step-active');
                }
              });

      this.#slider.querySelectorAll('.slider__step')[this.value].classList.add('slider__step-active');

    };

    document.addEventListener('pointermove', onMove);

    document.addEventListener('pointerup', (event) => {

      const stepsDragAndDropEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      document.body.querySelector('.slider').dispatchEvent(stepsDragAndDropEvent);

      let leftPercents = this.value / segments * 100;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.#slider.classList.remove('.slider_dragging');

      document.removeEventListener('pointermove', onMove);

    }, {once: true});
  }

  #onStepsClick = (event) => {
    let left = event.clientX - this.#slider.getBoundingClientRect().left;
    let leftRelative = left / this.#slider.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    this.#slider.querySelector('.slider__value').innerText = this.value;

    this.#slider.querySelectorAll('.slider__step').forEach((item) => {
      if(item.classList.contains('slider__step-active')){
        item.classList.remove('slider__step-active');
      }
    });

    this.#slider.querySelectorAll('.slider__step')[this.value].classList.add('slider__step-active');

    let thumb = this.#slider.querySelector('.slider__thumb');
    let progress = this.#slider.querySelector('.slider__progress');

    let leftPercents = this.value / segments * 100; // Значение в процентах от 0 до 100
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const stepsClickEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    document.body.querySelector('.slider').dispatchEvent(stepsClickEvent);
  }

  #sliderSteps(){
    let spans = `<span class="slider__step slider__step-active" data-step-number = "0"></span>`;
    for (let i = 1; i <= this.steps - 1; i++) {
      spans += `<span class="slider__step"></span>`;
    }
    return spans;
  }

  #template() {
    return `
      <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" ></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
      ${this.#sliderSteps()}
      </div>
      </div>
    ` ;
  }

  get elem() {
    return this.#slider;
  }
}
