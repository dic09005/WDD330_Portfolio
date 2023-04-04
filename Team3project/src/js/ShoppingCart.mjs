import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { calcNumCartItems, calcCartTotal, numberWithCommas } from "./cartContents.js";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <img
    src="${item.Images.PrimarySmall}"
    alt="${item.Name}"
  />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <button class="qtbtn" value="${item.Id}" data-value="increase" >+</button>
    <button class="qtbtn" value="${item.Id}" data-value="decrease" >-</button>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class = "qtbtn removeBtn" value = "${item.Id}" onclick = ${removeIcon()} >X</button>
  </li>`;
    return newItem;
  }

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    // only create a product list and total if cart isn't empty
    if (cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  
      // get the sum of cart products
      let cartTotal = calcCartTotal();
      renderCartTotal(cartTotal);
    } else {
      // if cart is empty, display message
      document.querySelector(this.parentSelector).innerHTML = "";
      document.getElementById("cart-footer").classList.remove("hide");
      document.getElementById("cart-footer").innerHTML =
        "Your cart is empty.<br>Shop <a href='/index.html'>here</a>.";
    }

   // add event listener to amount buttons
   const qtbtnsNodeList = document.querySelectorAll(".qtbtn");
   const qtbtns = Array.from(qtbtnsNodeList);
   qtbtns.forEach(btn => btn.addEventListener("click", () => {this.alterCart(cartItems, btn)}));
       }

   // adds or subtracts from cart
   alterCart(cartItems, btn) {
     let subtract;
     const item = cartItems.find(function findIt(e) { if (e.Id == btn.value) return e.Id});
     if (btn.getAttribute("data-value") == "increase") {
       subtract = false;
     } else {
       subtract = true;
     }
     setLocalStorage("so-cart", item, subtract);
     this.renderCartContents();
     calcNumCartItems();
     }
    }
  
  // if there are items in the cart, total will be displayed
  function renderCartTotal(cartTotal) {
    cartTotal = numberWithCommas(cartTotal.toFixed(2));
    document.getElementById("cart-footer").classList.remove("hide");
    document.getElementById("cart-footer").innerText = "Total: $";
    // append price to div
    const cartTotalContent = document.createTextNode(cartTotal);
    document.getElementById("cart-footer").appendChild(cartTotalContent);
  }
  function removeIcon(){
    console.log("remove");
  }