var productNames = [];
var products = [];
var receipt = [];
let due = 0;

function addProduct() {
  let name = document.getElementById("productName").value;
  if (name.trim() != "") productNames.push(name.trim());
  nameList();
}

function nameList() {
  let list = document.getElementById("nameList");
  let listHtml = "";
  for (product of productNames) {
    listHtml += `<option value=${product}>${product}</option>`
  }
  list.innerHTML = listHtml;
}

function addPrice() {
  let list = document.getElementById("nameList");
  let price = document.getElementById("productPrice").value;
  if (!isNaN(price)) {
    products.push({ name: list.value, price: price });
  } else {
    alert("Enter a valid number");
  }
  productList()
}

function newTransaction() {
  receipt = [];
  cart();
}

function addToCart() {
  let list = document.getElementById("productList");
  let unit = Number(document.getElementById("unit").value);
  let price = 0;
  for (product of products) {
    if (product.name == list.value) {
      price = product.price;
      break;
    }
  }
  if (!isNaN(unit)) {
    receipt.push({ "name": list.value, "price": price, "unit": unit });
  } else {
    alert("Enter a valid number");
  }
  cart();
}

function productList() {
  let list = document.getElementById("productList");
  let listHtml = "";
  for (product of products) {
    listHtml += `<option value=${product.name}>${product.name} $${product.price}/unit</option>`
  }
  list.innerHTML = listHtml;
}

function addUnit(x) {
  let units = document.getElementById("unit").value;
  units += x;
  document.getElementById("unit").value = units;
}

function cart() {
  let html = "";
  for (product of receipt) {
    html += `Product: ${product.name} Price: ${product.price} ${product.unit} units<br/>`
  }
  document.getElementById("cart").innerHTML = `<p>${html}</p>`;
}

function recieptAdd() {
  let totalPrice = 0;
  let tableHtml = "";
  let date = new Date();

  for (product of receipt) {
    tableHtml += `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.unit}</td><td>${product.price * product.unit}</td></tr>`
    totalPrice += Number(product.price) * Number(product.unit); // Update here
  }

  document.getElementById("date").innerHTML = `Date: ${date.getMonth().toLocaleString('en-US', { month: 'long' })}/${date.getDate()}/${date.getFullYear()}`;
  document.getElementById("time").innerHTML = `Time: ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  document.getElementById("recieptProducts").innerHTML = tableHtml;
  document.getElementById("price").innerHTML = `Total Price: ${totalPrice}`;
  document.getElementById("tax").innerHTML = `Taxes: ${totalPrice * 0.05}`;
  due = totalPrice + (totalPrice * 0.05);
  document.getElementById("totalPrice").innerHTML = `Amount Due: ${due}`;
}

function pay() {
  recieptAdd();
}