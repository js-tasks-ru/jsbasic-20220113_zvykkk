import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  #productGrid = 0;
  #productsFiltered = 0;

  constructor(products) {
    this.products = products;
    this.#createProductGrid();
    this.filters = {};
  }

  #createProductGrid() {
    this.#productGrid = createElement(this.#template());
    this.#createProductCard();
  }

  #createProductCard() {
    let items;
    if (this.#productsFiltered) {
      this.#productGrid.querySelector('.products-grid__inner').innerHTML = '';
      items = this.#productsFiltered;
    } else {
      items = this.products;
    }

    items.forEach((product) => {
      let card = new ProductCard(product);
      let cardElem = card.elem;
      this.#productGrid.querySelector('.products-grid__inner').append(cardElem);
    });
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
             <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
       </div>
    `;
  }
  #filterProducts () {
    this.#productsFiltered = this.products;

    if (this.filters.noNuts) {
      this.#productsFiltered = this.#productsFiltered.filter(product => !product.nuts);
    }

    if (this.filters.vegeterianOnly) {
      this.#productsFiltered = this.#productsFiltered.filter(product => product.vegeterian);
    }

    if (this.filters.maxSpiciness) {
      this.#productsFiltered = this.#productsFiltered.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      this.#productsFiltered = this.#productsFiltered.filter(product => !product.category.localeCompare(this.filters.category));
    }

    this.#createProductCard();
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this.#filterProducts();
  }

  get elem() {
    return this.#productGrid;
  }
}
