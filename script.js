// ---------- 1. Add-to-cart logic ----------
const addButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

let cart = [];

addButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const drinkName = event.target.dataset.name;
    const drinkPrice = parseFloat(event.target.dataset.price);

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === drinkName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: drinkName, price: drinkPrice, quantity: 1 });
    }

    updateCartDisplay();
  });
});

function updateCartDisplay() {
  cartItems.innerHTML = ''; // clear list
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Clear cart button
if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
  });
}


// ---------- 2. Form submission and validation ----------
const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const drink = document.getElementById('drink').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const address = document.getElementById('address').value.trim();

  if (!drink || !quantity || !address) {
    alert("⚠️ Please fill out all fields before paying.");
    return;
  }

  if (quantity <= 0) {
    alert("⚠️ Quantity must be at least 1.");
    return;
  }

  const total = calculateTotal(drink, quantity);
  alert(`✅ Order placed successfully!\n\nDrink: ${drink}\nQuantity: ${quantity}\nDelivery: ${address}\nTotal: $${total}`);
});

// ---------- 3. Calculate total for order form ----------
function calculateTotal(drink, quantity) {
  let price = 0;

  if (drink === "Berry Blast") price = 5;
  if (drink === "Green Smoothie") price = 6;

  const total = price * quantity;
  return total.toFixed(2);
}
