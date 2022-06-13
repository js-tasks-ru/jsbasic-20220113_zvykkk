export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  cartItem = {};

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
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

  updateProductCount(productId, amount) {
    this.cartItems.map((item, index) => {
      if (!item.product.id.localeCompare(productId)) {
        item.count += amount;
        if (!item.count) {
          this.cartItems.splice(item.count, 1);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

