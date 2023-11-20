//products lai data ma store garera yeta use gareko
let productsHTML='';

products.forEach((product)=>{
  productsHTML+=`
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10 /*image name create gareko*/}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2) /* Dollar ma convert gareko ani point pachadi duita number lyauna toFixed use gareko*/ }
          </div>

          <div class="product-quantity-container">
            <select class="js-selected-value-${product.id}"> //each product ko seperate select hunxa so id ley chutauna
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>`
});

//product display gareko
document.querySelector('.js-products-grid').innerHTML=productsHTML;

//add to cart garda cart ma id ra item pathako
let timeoutId;
document.querySelectorAll('.js-add-to-cart-btn').forEach((button)=>{
  button.addEventListener("click",()=>{
    const productId=button.dataset.productId;
    const quantitySelected=document.querySelector(`.js-selected-value-${productId}`); //tyo select bata aako value store garekoo yetaa

    //tyo added message visible banako
    clearTimeout(timeoutId);
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add("made-visible");

    //after 2 sec disapper garna
    timeoutId=setTimeout(function(){document.querySelector(`.js-added-to-cart-${productId}`).classList.remove("made-visible");},2000);

    //pailai tyo item xa ki nai hereko
    let matchedItem;
    cart.forEach((item)=>{
      if(productId===item.productId){
        matchedItem=item;
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
    //console.log(quantitySelected.value);

    //total cart quantity calculate gareko
    let cartQuantity=0;
    cart.forEach((item=>{
      cartQuantity+=item.quantity;
    }))

    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    console.log(cart);
  });
})