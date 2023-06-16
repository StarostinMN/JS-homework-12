(async () => {
  try {
    const responce = await fetch("data.json");

    if (!responce.ok) {
      throw new Error("Failed from data.json");
    }

    const data = await responce.json();

    const productBox = document.querySelector(".product__box");

    data.forEach(({ id, name, image, price, subtitle }) => {
      const productEl = `
            <div class="product">
            <img src="${image}" alt="${name}" class="product__img" />
            <div class="add-to-cart">
              <img src="img/hover.png" alt="add-to-cart" id="${id}">
            </div>
            
            <div class="product__content">
              <h2 class="product__title">${name}</h2>
              <p class="product__subtitle">${subtitle}</p>
              <p class="product__price"><span class="price">$${price}.00</span></p>
            </div>
          </div>`;
      productBox.insertAdjacentHTML("beforeend", productEl);
    });
  } catch (error) {
    console.error(error);
  }
}).apply();

function createEl() {
  const contentEl = document.querySelector('.content');
  if (!document.querySelector('.cart-items')) {
    contentEl.insertAdjacentHTML("beforeend", '<h2 class="cart-items-subtitle">Cart Items</h2>');
    const cartItemsEl = document.createElement('div');
    cartItemsEl.classList.add('cart-items');
    contentEl.appendChild(cartItemsEl);
  }
}

let productInCart = [];
let count = 0;

function delFromCart() {
  event.target.parentElement.parentElement.remove();
  for (let i = 0; i <= productInCart.length; i++) {
    if (productInCart[i] == event.target.id) {
      productInCart.splice(i, 1);
      console.log(productInCart.length);
      if (productInCart.length == 0) {
        document.querySelector('.cart-items').remove();
        document.querySelector('.cart-items-subtitle').remove();
      }
    };
  }
}

const productBox = document.querySelector(".product__box");
productBox.addEventListener('click', createEl, { once: false});

(async () => {
  try {
    const responce = await fetch("data.json");

    if (!responce.ok) {
      throw new Error("Failed from data.json");
    }

    const data = await responce.json();

    const addToCartEl = document.querySelector('.product__box');
    addToCartEl.addEventListener('click', function (e) {

      const targetId = e.target.id;

      data.forEach(({ id, name, image, price, subtitle, color, size, quantity }) => {
        const targetProductEl = `
              <div class="product-in-cart">
              <img src="${image}" alt="${name}" class="product__img" />
              
              <div class="del-from-cart">
                <img src="img/cross.svg" alt="del-from-cart" id="${id}" onclick="delFromCart()">
              </div>
              <div class="product__content">
                <h2 class="product__title">${name}</h2>
                <p class="product__price">Price: <span class="price">$${price}.00</span></p>
                <p class="product__color">Color: ${color}</p>
                <p class="product__size">Size: ${size}</p>
                <div class="product__quantity">
                        <label class="input__label">Quantity:</label>
                        <input class="input__quantity" type="text" value="${quantity}">
                </div>
              </div>
            </div>`;
        const cartItemsEl = document.querySelector('.cart-items');
        if (id == targetId) {
          for (let i = 0; i < productInCart.length; i++) {
            if (productInCart[i] == targetId) {
              count++;
            }
          }
          if (count == 0) {
            cartItemsEl.insertAdjacentHTML("beforeend", targetProductEl);
            productInCart.push(id);
          }
          count = 0;
        }
      });
    });

  } catch (error) {
    console.error(error);
  }
}).apply();






