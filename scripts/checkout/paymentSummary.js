import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utility/money.js";

export function renderPaymentSummary(){
  let totalProductPriceCents=0;
  let totalShippingPriceCents=0;

  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem.productId);
    totalProductPriceCents+=cartItem.quantity*product.priceCents;

    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);

    totalShippingPriceCents+=deliveryOption.priceCents;
  });

 // console.log(totalProductPriceCents);
  const totalBeforeTaxCents=totalProductPriceCents+totalShippingPriceCents;

  const estimatedTaxCents=totalBeforeTaxCents*0.1;

  const totalCostCents=totalBeforeTaxCents+estimatedTaxCents;

  const paymentSummaryHTML=`<div class="payment-summary-title">
                              Order Summary
                            </div>

                            <div class="payment-summary-row">
                              <div>Items (${calculateCartQuantity()}):</div>
                              <div class="payment-summary-money">$${formatCurrency(totalProductPriceCents)}</div>
                            </div>

                            <div class="payment-summary-row">
                              <div>Shipping &amp; handling:</div>
                              <div class="payment-summary-money">$${formatCurrency(totalShippingPriceCents)}</div>
                            </div>

                            <div class="payment-summary-row subtotal-row">
                              <div>Total before tax:</div>
                              <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
                            </div>

                            <div class="payment-summary-row">
                              <div>Estimated tax (10%):</div>
                              <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
                            </div>

                            <div class="payment-summary-row total-row">
                              <div>Order total:</div>
                              <div class="payment-summary-money">$${formatCurrency(totalCostCents)}</div>
                            </div>

                            <button class="place-order-button button-primary">
                              Place your order
                            </button>`;

    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}