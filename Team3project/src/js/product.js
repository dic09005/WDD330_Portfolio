import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// get the product Id
const productId = getParam("product");
// create instance of Product Data class
const dataSource = new ExternalServices("tents");

// uses above
const product = new ProductDetails(productId, dataSource);
product.init();
