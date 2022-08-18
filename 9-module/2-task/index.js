import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuHolder = document.querySelector('[data-ribbon-holder]');
    ribbonMenuHolder.append(this.ribbonMenu.elem);

    let param = {
      steps: 5,
      value: 3
    };
    this.stepSlider = new StepSlider(param);
    let stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    this.cart = new Cart(cartIcon);

    let response = await fetch("products.json");

    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      products.forEach(product => {
          if (!product.id.localeCompare(event.detail)) {
            this.cart.addProduct(product);
          }
        }
      );
    });

    document.querySelector('.slider').addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    document.querySelector('.ribbon').addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked,
      });
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: vegeterianCheckbox.checked,
      });
    });
  }
}
