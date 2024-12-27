// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage or initialize it if empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ''; // Clear the cart list before re-rendering
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
      cartList.appendChild(li);
    });
  }
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Save to sessionStorage
    renderCart(); // Re-render cart
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Update sessionStorage
  renderCart(); // Re-render cart
}

// Clear cart
function clearCart() {
  cart = []; // Empty the cart array
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Clear sessionStorage
  renderCart(); // Re-render cart
}

// Event listener for adding items to cart
productList.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for removing items from cart
cartList.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("remove-from-cart-btn")) {
    const index = parseInt(event.target.getAttribute("data-index"));
    removeFromCart(index);
  }
});

// Event listener for clearing the cart
clearCartButton.addEventListener("click", () => {
  clearCart();
});

// Initial render
renderProducts();
renderCart();
