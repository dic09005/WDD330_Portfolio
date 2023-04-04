import { renderListWithTemplate } from "./utils.mjs";

import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

/* FUNCTIONS FOR MODAL */
function openModal() {
  const modal = document.getElementById("modal");
  const buttons = document.getElementsByClassName("card__productModalbtn");
  const closeX = document.getElementsByClassName("close")[0];
  var position = "beforeend";

  for (var i = 0; i < buttons.length; i++) {
    let buttonId = buttons[i].value;
    buttons[i].addEventListener(
      "click",
      function () {
        modal.style.display = "block";
        const dataSource = new ExternalServices();
        const product = new ProductDetails(
          buttonId,
          dataSource,
          ".modal-content",
          position
        );
        product.init();
      },
      false
    );
  }

  // close modal if click on "x"
  closeX.onclick = function () {
    removeModalDetails();
  };
}

// close modal if click outside of it
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    removeModalDetails();
  }
};

// remove modal details for clean slate each click
function removeModalDetails() {
  modal.style.display = "none";
  const element = document.getElementsByClassName("modal-content")[0];
  element.innerHTML = '<span class="close">&times;</span>';
}
/* End Modal Functions */

function productCardTemplate(product) {
  let discount =
    ((product.FinalPrice - product.SuggestedRetailPrice) /
      product.SuggestedRetailPrice) *
    100 *
    -1;
  let newDiscount = Math.round(discount);

  return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="Image of ${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">
        ${product.NameWithoutBrand}
        </h2>
        <p class="product-card_MSR_price">Originally, $${product.SuggestedRetailPrice}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card_discount_price1">${newDiscount}% OFF</p></a>
        <button class="card__productModalbtn" value="${product.Id}">Quick View</button>
      </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);

    // render the list
    this.renderList(list);

    // once the HTML is rendered we can add a listener to buttons
    document
      .querySelector(".sortByName")
      .addEventListener("click", this.sortByName.bind(this, list));
    document
      .querySelector(".sortByPrice")
      .addEventListener("click", this.sortByPrice.bind(this, list));

    document.querySelector(".title").innerHTML = this.category;

    // add event listener to input
    let searchQuery = document.querySelector(".product-search");
    searchQuery.addEventListener("change", (e) => {
      this.filterSearch(list, searchQuery.value);
    });
    document
      .querySelector(".product-search-btn")
      .addEventListener("click", (e) => {
        this.filterSearch(list, searchQuery.value);
      });

    openModal();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // sort products by brand
  sortByName(list) {
    function compareName(a, b) {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    list.sort(compareName);
    var clear = true;
    var position = "afterbegin";
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      position,
      clear
    );
  }

  // Sort items by Price ascending
  sortByPrice(list) {
    function comparePrice(a, b) {
      const priceA = a.FinalPrice;
      const priceB = b.FinalPrice;

      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }

    list.sort(comparePrice);
    var clear = true;
    var position = "afterbegin";
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      position,
      clear
    );
  }

  filterSearch(list, query) {
    let newList = [];
    query = query.toUpperCase();
    for (let i = 0; i < list.length; i++) {
      let compareBrand = list[i].Brand.Name.toUpperCase();
      let compareName = list[i].Name.toUpperCase();

      if (compareBrand.includes(query)) {
        newList.push(list[i]);
      }
      
      else if (compareName.includes(query)) {
        newList.push(list[i]);
      }
    }

    var clear = true;
    var position = "afterbegin";
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      newList,
      position,
      clear
    );
  }
}
