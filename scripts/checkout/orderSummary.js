import{cart, removeFromCart,calculateCartQuantity, updateCartQuantity,updateDeliveryOption} from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { displayTotalCheckoutItems } from '../utility/checkoutDisplay.js';
import { formatCurrency } from '../utility/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';//esm wala load gareko so that as modulw use garna milos
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
      let cartHTML='';
      cart.forEach((cartItem)=>{
        const productId=cartItem.productId;

        const matchingItem=getProduct(productId);

        const deliveryOptionId=cartItem.deliveryOptionId;

        const deliveryOption=getDeliveryOption(deliveryOptionId);

        const today=dayjs();
        const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
        const dateString=deliveryDate.format('dddd, MMMM D');

        cartHTML+=`<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                      <div class="delivery-date">
                        Delivery date: ${dateString}
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
                          ${deliveryOptionHtml(matchingItem,cartItem)}
                        </div>
                      </div>
                    </div>`;
      });


      function deliveryOptionHtml(matchingItem,cartItem){
        let deliveryHtml='';
        deliveryOptions.forEach((option)=>{
          const today=dayjs();
          const deliveryDate=today.add(option.deliveryDays,'days');
          const dateString=deliveryDate.format('dddd, MMMM D');
          const priceString=option.priceCents===0?'FREE':`$${formatCurrency(option.priceCents)}`;

          const isChecked=option.id===cartItem.deliveryOptionId;

          deliveryHtml+=`<div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${option.id}">
                            <input type="radio" 
                              ${isChecked?'checked':''}
                              class="delivery-option-input"
                              name="delivery-option-${matchingItem.id}">
                            <div>
                              <div class="delivery-option-date">
                                ${dateString}
                              </div>
                              <div class="delivery-option-price">
                                ${priceString} Shipping
                              </div>
                            </div>
                          </div>`
        });
        return deliveryHtml;
      }

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

          renderPaymentSummary();
        });
      });

      document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        })
      });


      function workingSavebutton(productId){
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

        const quantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        //console.log(quantity);
        if(quantity>=0 && quantity<1000){
          updateCartQuantity(productId,quantity);

          document.querySelector(`.js-quantity-label-${productId}`).innerHTML=quantity;
        
          displayTotalCheckoutItems(calculateCartQuantity());

          renderPaymentSummary();
          //console.log(cart);
        }
      }
      document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          workingSavebutton(productId);
        })
      });

      document.querySelector('body').addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
          document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
              const productId=link.dataset.productId;
              workingSavebutton(productId);
            })
        }
      });

      document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
          const productId=element.dataset.productId;
          const deliveryOptionId=element.dataset.deliveryOptionId;
          updateDeliveryOption(productId,deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        })
      });
}
