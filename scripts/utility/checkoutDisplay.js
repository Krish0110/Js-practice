export function displayTotalCheckoutItems(totalQuantity){
  if(totalQuantity===1 || totalQuantity===0){
    document.querySelector('.js-total-cart-item').innerHTML=`${totalQuantity} item`;
  }
  else{
    document.querySelector('.js-total-cart-item').innerHTML=`${totalQuantity} items`;
  }
}