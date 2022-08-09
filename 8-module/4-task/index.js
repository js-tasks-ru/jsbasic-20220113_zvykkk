import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};
  modal = 0;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct (product) {
    if (!product) {
      return;
    }

    this.cartItem = {
      product: product,
      count: 1
    };

    if (this.cartItems.length) {
      let pushItem = true;

      this.cartItems.map(item => {
        console.log(item);
        if (!item.product.id.localeCompare(product.id)) {
          item.count += 1;
          this.cartItem.count = item.count;
          pushItem = false;
        }
      });

      if (pushItem) {
        this.cartItems.push(this.cartItem);
      }

    } else {
      this.cartItems.push(this.cartItem);
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount (productId, amount) {
    this.cartItems.map((item, index) => {
      if (!item.product.id.localeCompare(productId)) {
        item.count += amount;
        if (!item.count) {
          this.cartItems.splice(index, 1);
        }
        this.cartItem = {
          product: item.product,
          count: item.count,
        };
      }
    });

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(item => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += (item.product.price * item.count));
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="../../assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="../../assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="../../assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let concat = '';
    this.cartItems.forEach(item => concat += this.renderProduct(item.product, item.count).outerHTML);
    this.modal.setBody(createElement(`<div>${concat + this.renderOrderForm().outerHTML}</div>`));

    this.modal.open();

    this.onPlusMinusClick = (event) => {
      let target = event.target.alt;
      let productId = event.currentTarget.dataset.productId;

      if (target === 'plus') {
        this.updateProductCount(productId,  + 1);
      }

      if (target === 'minus') {
        this.updateProductCount(productId,  - 1);
      }
    };

    Array.from(document.querySelectorAll('.cart-product')).map((item) => {
      item.addEventListener('click', this.onPlusMinusClick);
    });

    document.querySelector('.cart-form').addEventListener('submit', this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.matches('.is-modal-open')){
      if (!this.cartItems.length) {
        return this.modal.close();
      }

      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal');

      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;

      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  render(){
    this.modal.setTitle('Success!');
  }

  onSubmit(event) {
    event.preventDefault();

    let button = document.querySelector('button[type="submit"]');
    button.classList.add('is-loading');

    let form = document.querySelector('.cart-form');

    let formData = new FormData(form);

    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });

    let template = `
        <div class="modal__body-inner">
            <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
            </p>
        </div>
    `;

    response.then(() => {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.modal.setBody(createElement(template));
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

