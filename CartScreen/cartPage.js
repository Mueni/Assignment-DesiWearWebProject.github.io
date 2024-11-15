// Initialize cart array in localStorage if it doesn't exist
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update cart counter
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cartItems.length;
        cartCounter.style.display = cartItems.length > 0 ? 'block' : 'none';
    }
}
// document.querySelector('.cart-counter'); {
//     if (cartCounter) {
//         cartCounter.textContent = cartItems.length;
//         // Hide counter if cart is empty
//         cartCounter.style.display = cartItems.length > 0 ? 'block' : 'none';
//     }
// }

// Function to add item to cart
function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            color: product.selectedColor || product.colors[0],
            size: product.selectedSize || product.sizes[0]
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart counter
    updateCartCounter();
}
// Initialize cart counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            // Update totals before proceeding to checkout
            updateCartTotals();
            // Redirect to checkout page
            window.location.href = '../paymentsScreen/paymentPage.html';
        });
    }

      // Function to update cart display and totals
      function updateCart() {
        displayCartItems();
        updateCartTotals();
    }

    // Call updateCart whenever the cart changes
    function updateCartItem(productId, newQuantity) {
        updateCart();
    }

    function removeCartItem(productId) {
        updateCart();
    }
    
});

// Function to remove item from cart
// function removeFromCart(productId) {
//     cartItems = cartItems.filter(item => item.id !== productId);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     // updateCartCounter();
//     // // If we're on the cart page, update the display
//     // if (window.location.href.includes('cart.html')) {
//     //     displayCartItems();
//     // }
// }

// Function to remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Remove item element from DOM
    const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (itemElement) {
        itemElement.remove();
    }
    
    // Update cart display
    updateCartDisplay();
    
    // Show empty cart message if no items left
    if (cartItems.length === 0) {
        document.querySelector('.cart-content').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
    }
}

// Function to update item quantity
// function updateQuantity(productId, change) {
//     const item = cartItems.find(item => item.id === productId);
//     if (item) {
//         item.quantity = Math.max(1, item.quantity + change);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//         if (window.location.href.includes('cart.html')) {
//             displayCartItems();
//         }
//     }
// }

function updateCartItemQuantity(productId, change) {
    // Find the item in the cart
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // Calculate new quantity
        const newQuantity = cartItems[itemIndex].quantity + change;
        
        // If quantity would be 0 or less, remove item
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        // Update quantity
        cartItems[itemIndex].quantity = newQuantity;
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update display
        updateCartDisplay();
    }
}



// Function to update cart display
function updateCartDisplay() {
    // Update item quantities and totals
    cartItems.forEach(item => {
        const itemElement = document.querySelector(`.cart-item[data-id="${item.id}"]`);
        if (itemElement) {
            // Update quantity display
            const quantityElement = itemElement.querySelector('.quantity-value');
            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }
            
            // Update item total
            const totalElement = itemElement.querySelector('.item-total');
            if (totalElement) {
                totalElement.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            }
        }
    });
    
    // Update cart summary
    updateCartSummary();
    
    // Update cart counter in nav
    updateCartCounter();
}

function updateCartTotals() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0; // Example shipping cost
    const total = subtotal + shipping;

    const cartTotals = {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
    };

    // Save totals to localStorage
    localStorage.setItem('cartTotals', JSON.stringify(cartTotals));
    
    // Update display in cart page
    if (document.getElementById('cart-subtotal')) {
        document.getElementById('cart-subtotal').textContent = `$${cartTotals.subtotal}`;
        document.getElementById('cart-shipping').textContent = `$${cartTotals.shipping}`;
        document.getElementById('cart-total').textContent = `$${cartTotals.total}`;
    }
}
