export const cart=[];

//add to cart garda cart ma id ra item pathako
export function addToCart(productId,quantitySelected){
  //pailai tyo item xa ki nai hereko
  let matchedItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchedItem=cartItem;
    }
  });

  if(matchedItem){
    matchedItem.quantity+=Number(quantitySelected.value); //dom ley string value dinxa so tyeslai number ma lagna parxa
  }
  else{
    cart.push({
      productId:productId,
      quantity:Number(quantitySelected.value)
    });
  }
}