import { calcNumCartItems } from "./cartContents";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data, subtract = false) {

  // check if there is anything in local storage. If not,
  // create an empty array and add item. Otherwise, parse and add
  const cartItems = (() => {
    const itemData = localStorage.getItem(key);
    return itemData === null ? []
    : JSON.parse(itemData);
  })();

  if (!subtract) {
  // check if item is already in cart
  if (cartItems.some(e => e.Id === data.Id)) {
    // if it is in cart, increase quantity by 1
    data = cartItems.find(e => e.Id === data.Id);
    data.Quantity += 1;
  } else {
    // if its not already in cart, give it quantity 1 and add to cart
    data.Quantity = 1;
    cartItems.push(data);
  }
} else if (subtract) {
  // check if item is already in cart
  if (cartItems.some(e => e.Id === data.Id)) {
    // if it is in cart, decrease quantity by 1
    data = cartItems.find(e => e.Id === data.Id);
    const index = cartItems.findIndex(e => e.Id === data.Id);
    // if qty = 0 remove from cart
    data.Quantity += -1;
    if (data.Quantity <= 0) {
      if (index > -1) {
      cartItems.splice(index, 1);
  }
    }
  }
}

  // save to local storage
    localStorage.setItem(key, JSON.stringify(cartItems));
}

// save data to local storage
export function setLocalStorageComments(key, data) {
  // check if there is anything in local storage. If not,
  // create an empty array and add item. Otherwise, parse and add
  const itemComments = (() => {
    const itemComment = localStorage.getItem(key);
    return itemComment === null ? []
    : JSON.parse(itemComment);
  })();

  itemComments.push(data);
  // save to local storage
    localStorage.setItem(key, JSON.stringify(itemComments));
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  // added returning the product
  return product;
}


// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// WEEK 05 TEAM4

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {

  let headerTemplate = await loadTemplate("../partials/header.html");
  let footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  calcNumCartItems();
}

export function myHeader() {
  const header = document.querySelector(".pathHeader");
  return header;
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}