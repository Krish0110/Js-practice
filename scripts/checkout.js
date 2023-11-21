import{cart, removeFromCart,calculateCartQuantity, updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { displayTotalCheckoutItems } from './utility/checkoutDisplay.js';
import { formatCurrency } from './utility/money.js';

let cartHTML='';
cart.forEach((cartItem)=>{
  const productId=cartItem.productId;

  let matchingItem;

  products.forEach((product)=>{
    if(product.id===productId){
      matchingItem=product;
    }
  });

  cartHTML+=`<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingItem.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingItem.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingItem.id}>
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingItem.id}">
                      <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingItem.id}>Save</span>
                      <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${matchingItem.id}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
});

document.querySelector('.js-order-summary').innerHTML=cartHTML;

displayTotalCheckoutItems(calculateCartQuantity());

document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId);

    //Html bata remove gareko
    const deletedItem=document.querySelector(`.js-cart-item-container-${productId}`);
    deletedItem.remove();

    displayTotalCheckoutItems(calculateCartQuantity());
  })
})

document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  })
})

document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

    const quantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    //console.log(quantity);

    updateCartQuantity(productId,quantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML=quantity;

    displayTotalCheckoutItems(quantity);
    //console.log(cart);
  })
})