export const cart=[  {
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:1
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
},];

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