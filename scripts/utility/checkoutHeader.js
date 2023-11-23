import { calculateCartQuantity } from "../../data/cart.js";

//checkout matra change garni function
// export function displayTotalCheckoutItems(totalQuantity){
//   if(totalQuantity===1 || totalQuantity===0){
//     document.querySelector('.js-total-cart-item').innerHTML=`${totalQuantity} item`;
//   }
//   else{
//     document.querySelector('.js-total-cart-item').innerHTML=`${totalQuantity} items`;
//   }
// }

//reload garni function
export function renderCheckoutHeader(){
  const cartQuantity=calculateCartQuantity();
  let checkoutHeaderHTML;
  if(cartQuantity===1||cartQuantity===0){
    checkoutHeaderHTML=`<div class="header-content">
                                <div class="checkout-header-left-section">
                                  <a href="amazon.html">
                                    <img class="amazon-logo" src="images/amazon-logo.png">
                                    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                                  </a>
                                </div>

                                <div class="checkout-header-middle-section">
                                  Checkout (<a class="return-to-home-link js-total-cart-item "
                                    href="amazon.html">${cartQuantity} item</a>)
                                </div>

                                <div class="checkout-header-right-section">
                                  <img src="images/icons/checkout-lock-icon.png">
                                </div>
                              </div>`
  }
  else{
    checkoutHeaderHTML=`<div class="header-content">
                                <div class="checkout-header-left-section">
                                  <a href="amazon.html">
                                    <img class="amazon-logo" src="images/amazon-logo.png">
                                    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                                  </a>
                                </div>

                                <div class="checkout-header-middle-section">
                                  Checkout (<a class="return-to-home-link js-total-cart-item "
                                    href="amazon.html">${cartQuantity} items</a>)
                                </div>

                                <div class="checkout-header-right-section">
                                  <img src="images/icons/checkout-lock-icon.png">
                                </div>
                              </div>`
  }

document.querySelector('.js-checkout-header').innerHTML=checkoutHeaderHTML;
}