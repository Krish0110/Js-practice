export let cart=JSON.parse(localStorage.getItem('cart'));
//yo hamley default deko
if(!cart){
  cart=[  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryOptionId:'1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  },];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

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
      quantity:Number(quantitySelected.value),
      deliveryOptionId:'1'
    });
  }

  saveToStorage();
}

export function calculateCartQuantity(){
  //total cart quantity calculate gareko
  let cartQuantity=0;
  cart.forEach((item=>{
    cartQuantity+=item.quantity;
  }));

  localStorage.setItem('cartQuantity',cartQuantity);
  return cartQuantity;
}

export function removeFromCart(productId){
  const newcart=[];

  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newcart.push(cartItem);
    }
  })

  cart=newcart;
  
  saveToStorage();
}

export function updateCartQuantity(productId,newQuantity){
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.quantity=newQuantity;
    }
  });

  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchedItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchedItem=cartItem;
    }
  });

  matchedItem.deliveryOptionId=deliveryOptionId;

  saveToStorage();
}