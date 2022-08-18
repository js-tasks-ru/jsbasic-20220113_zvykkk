import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #ribbon = 0;
  #previousActiveCategory = 0;

  constructor(categories) {
    this.categories = categories;
    this.#createRibbon();
    this.#scrollRibbon();
  }

  #createRibbon () {
    this.#ribbon = createElement(this.#template());
    this.#ribbon.querySelector('.ribbon__inner').addEventListener('click', this.#onCategoryClick);
  }

  #onCategoryClick = (event) => {
    event.preventDefault();
    if (this.#previousActiveCategory) {
      this.#previousActiveCategory.classList.remove('ribbon__item_active');
    }
    event.target.classList.add('ribbon__item_active');
    this.#previousActiveCategory = event.target;

    let id = event.target.dataset.id;
    const categoryClickEvent = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    });

    this.#ribbon.dispatchEvent(categoryClickEvent);
  }

  #template() {
    return `
       <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
      ${
      this.categories.map((item) => `
        <a href="#" class="ribbon__item" data-id = "${item.id}">
            ${item.name}
        </a>`
       ).join('')
      }
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `;
  }

  #scrollRibbon() {
    const buttonRight = this.#ribbon.querySelector('.ribbon__arrow_right');
    const buttonLeft = this.#ribbon.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.#ribbon.querySelector('.ribbon__inner');

    buttonRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    buttonLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - clientWidth - scrollLeft;

      scrollLeft == 0 ? buttonLeft.classList.remove('ribbon__arrow_visible') :
        buttonLeft.classList.add('ribbon__arrow_visible');

      scrollRight < 1 ? buttonRight.classList.remove('ribbon__arrow_visible') :
        buttonRight.classList.add('ribbon__arrow_visible');
    });
  }

  get elem() {
    return this.#ribbon;
  }
}
