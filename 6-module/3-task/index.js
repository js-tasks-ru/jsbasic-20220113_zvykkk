import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides = [];
  #carousel = 0;

  constructor(slides) {
    this.#slides = slides;
    this.#createCarousel();
    this.#initCarousel();
  }

  #createCarousel () {
    this.#carousel = createElement(this.#template());

    const items = Array.from(this.#carousel.querySelectorAll('.carousel__button'));
    items.map((item) => item.addEventListener('click', this.#onPlusClick));
  }

  #onPlusClick = (event) => {
    const id = event.target.closest('.carousel__slide').dataset.id;
    const plusClickEvent = new CustomEvent("product-add", {
      detail: id,
      bubbles: true
    });

    this.#carousel.dispatchEvent(plusClickEvent);
  }

  #template() {
    return `
    <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
        <div class="carousel__inner">
            ${
              this.#slides.map((slide) => `
              <div class="carousel__slide" data-id="${slide.id}">
                <img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                        <div class="carousel__title">${slide.name}</div>
                        <button type="button" class="carousel__button">
                            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
                        </button>
                    </div>
                </div>
              `)
            }
        </div>
    </div>
    `;
  }

  #initCarousel() {
    const buttonRight = this.#carousel.querySelector('.carousel__arrow_right');
    const buttonLeft = this.#carousel.querySelector('.carousel__arrow_left');
    const carouselInner = this.#carousel.querySelector('.carousel__inner');

    let slideWidth = 0;
    let currentAmount = 0;

    buttonLeft.style.display = 'none';

    buttonRight.addEventListener('click', () => {
      slideWidth = document.querySelector('.carousel__slide').offsetWidth;
      buttonLeft.style.display = '';
      currentAmount -= slideWidth;
      carouselInner.style.transform = `translateX(${currentAmount}px)`;
      if(currentAmount == - (slideWidth * (this.#slides.length - 1))) {
        buttonRight.style.display = 'none';
      }
    });

    buttonLeft.addEventListener('click', () => {
      slideWidth = document.querySelector('.carousel__slide').offsetWidth;
      buttonRight.style.display = '';
      currentAmount += slideWidth;
      carouselInner.style.transform = `translateX(${currentAmount}px)`;
      if(currentAmount == 0) {
        buttonLeft.style.display = 'none';
      }
    });
  }

  get elem() {
    return this.#carousel;
  }
}
