// Array of product objects
const products = [
    {
        id: 1,
        name: "Shalwar kameez Women",
        price: 29.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWear-1.webp",
        category: "women",
        colors: ["#000", "#fff", "#ff0000"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true
    },
    {
        id: 2,
        name: "Shalwar kameez Men",
        price: 59.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearMen-2.webp",
        category: "women",
        colors: ["#000080", "#4169e1"],
        sizes: ["S", "M", "L"],
        inStock: true
    },
    {
        id: 3,
        name: "Achkan Women",
        price: 49.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWear-2.webp",
        category: "women",
        colors: ["#ff69b4", "#98fb98"],
        sizes: ["S", "M", "L"],
        inStock: true
    },
    {
        id: 4,
        name: "Achkan Men",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearMen-3.jpg",
        category: "men",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: true
    },
    {
        id: 5,
        name: "Shalwar kameez Women",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWear-5.webp",
        category: "men",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: true
    },
    {
        id: 6,
        name: "Shalwar kameez Men",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearMen-4.webp",
        category: "men",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: false
    },
    {
        id: 7,
        name: "Achkan kids",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearKids-1.webp",
        category: "kids",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: true
    },
    {
        id: 8,
        name: "Shalwar kameez  kids",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearKids-2.webp",
        category: "kids",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: true
    },
    {
        id: 8,
        name: "Achkan kids",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearKids-4.png",
        category: "kids",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: true
    },
    {
        id: 8,
        name: "Shalwar kameez kids",
        price: 79.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/assets/Images/pakistaniWearKids-5.webp",
        category: "kids",
        colors: ["#000", "#fff"],
        sizes: ["40", "41", "42", "43"],
        inStock: false
    },


];

// Function to create HTML for color dots
function createColorDots(colors) {
    return colors.map(color =>
        `<span class="color-dot" style="background-color: ${color};">`
    ).join('');
}

// Function to display products
function displayProducts(productsArray) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    productsArray.forEach(product => {
        const productHTML = `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <button class="quick-view">Quick View</button>
                    </div>
                    ${!product.inStock ? '<div class="out-of-stock">Out of Stock</div>' : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="description">${product.description}</p>
                    <p class="price">pkr ${product.price.toFixed(2)}</p>
                    <div class="color-options">
                        ${createColorDots(product.colors)}
                    </div>
                    <div class="size-options">
                        ${product.sizes.map(size =>
            `<button class="size-btn">${size}</button>`
        ).join('')}
                    </div>
                    <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    });

}

// Function to filter products
function filterProducts() {
    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    displayProducts(filteredProducts);
}

// Function to sort products
function sortProducts(sortBy) {
    const productsCopy = [...products];

    switch (sortBy) {
        case 'price-low':
            productsCopy.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            productsCopy.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            productsCopy.sort((a, b) => b.id - a.id);
            break;
    }

    displayProducts(productsCopy);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    displayProducts(products);

    // Sort functionality
    const sortSelect = document.getElementById('sort');
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Filter functionality
    const filterInputs = document.querySelectorAll('.filters input');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });

    // Quick view functionality
    document.querySelector('.product-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-view')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.id;
            // Implement quick view modal here
            console.log(`Quick view for product ${productId}`);
        }
    });

    // Add to cart button click handler
    document.querySelector('.product-grid').addEventListener('click', (e) => {
        console.log('Clicked element:', e.target);

        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                addToCart(product);
                // Optional: Show success message
                alert('Product added to cart!');
            }
        }
    });

    // Modal add to cart button
    document.getElementById('modal-add-to-cart').addEventListener('click', () => {
        console.log('Modal add to cart clicked'); 

        const modalContent = document.querySelector('.modal-content');
        const productId = parseInt(modalContent.dataset.productId);
        console.log('Product ID:', productId);

        const product = products.find(p => p.id === productId);
        console.log('Found product:', product); 

        if (product) {
            // Get selected color and size
            const selectedColor = document.querySelector('#modal-color-options .color-dot.active')?.style.backgroundColor;
            const selectedSize = document.querySelector('#modal-size-options .size-btn.active')?.textContent;
            const quantity = parseInt(document.getElementById('quantity').value) || 1;

            console.log('Selected options:', { selectedColor, selectedSize, quantity }); 

            // Create product object with selected options
            const productToAdd = {
                ...product,
                selectedColor: selectedColor || product.colors[0],
                selectedSize: selectedSize || product.sizes[0],
                quantity: quantity
            };

            // Add to cart
            addToCart(productToAdd);

            // Close modal
            closeModal();

            // Show success message
            alert('Product added to cart!');
        } else {
            console.error('Product not found'); 
        }
    });

    // Close modal button
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('product-modal')) {
            closeModal();
        }
    });
});







// Function to open modal and display product details
function openProductModal(productId) {
    console.log('Opening modal for product ID:', productId);

    // First, check if products array exists and has items
    if (!products || !Array.isArray(products)) {
        console.error('Products array is not properly defined');
        return;
    }

    const product = products.find(p => p.id === parseInt(productId));
    console.log('Found product:', product); 

    if (!product) {
        console.error('Product not found');
        return;
    }

    try {
        // Set the product ID to the modal
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) {
            console.error('Modal content element not found');
            return;
        }
        modalContent.dataset.productId = productId;

        // Update modal content with product details
        const mainImage = document.getElementById('modal-main-image');
        const productName = document.getElementById('modal-product-name');
        const productPrice = document.getElementById('modal-product-price');
        const productDescription = document.getElementById('modal-product-description');

        if (!mainImage || !productName || !productPrice || !productDescription) {
            console.error('One or more modal elements not found');
            return;
        }

        mainImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productDescription.textContent = product.description;

        // Update product status
        const statusElement = document.getElementById('modal-product-status');
        if (statusElement) {
            statusElement.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
            statusElement.className = `product-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
        }

        // Update color options
        const colorOptionsContainer = document.getElementById('modal-color-options');
        if (colorOptionsContainer && Array.isArray(product.colors)) {
            colorOptionsContainer.innerHTML = product.colors
                .map(color => `
                    <div class="color-dot" 
                         style="background-color: ${color};"
                         onclick="selectColor(this, '${color}')">
                    </div>
                `).join('');
        }

        // Update size options
        const sizeOptionsContainer = document.getElementById('modal-size-options');
        if (sizeOptionsContainer && Array.isArray(product.sizes)) {
            sizeOptionsContainer.innerHTML = product.sizes
                .map(size => `
                    <button class="size-btn" 
                            onclick="selectSize(this, '${size}')">
                        ${size}
                    </button>
                `).join('');
        }

        // Reset quantity
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantityInput.value = '1';
        }

        // Show modal
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error('Modal element not found');
        }

        //event listeners for modal functionality
        setupModalEventListeners();

    } catch (error) {
        console.error('Error in openProductModal:', error);
    }
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Reset modal state
        document.getElementById('quantity').value = '1';
        
        // Clear selections
        document.querySelectorAll('.color-dot').forEach(dot => 
            dot.classList.remove('active'));
        document.querySelectorAll('.size-btn').forEach(btn => 
            btn.classList.remove('active'));
    }
}

// Helper function to setup modal event listeners
function setupModalEventListeners() {
    // Close button
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
        closeButton.onclick = function() {
            document.getElementById('product-modal').style.display = 'none';
        }
    }


    // Add to cart button
    const addToCartButton = document.getElementById('modal-add-to-cart');
    if (addToCartButton) {
        addToCartButton.onclick = function() {
            const modalContent = document.querySelector('.modal-content');
            const productId = modalContent.dataset.productId;
            const product = products.find(p => p.id === parseInt(productId));
            
            if (product) {
                const selectedColor = document.querySelector('#modal-color-options .color-dot.active')?.style.backgroundColor;
                const selectedSize = document.querySelector('#modal-size-options .size-btn.active')?.textContent;
                const quantity = parseInt(document.getElementById('quantity').value) || 1;

                const productToAdd = {
                    ...product,
                    selectedColor: selectedColor || product.colors[0],
                    selectedSize: selectedSize || product.sizes[0],
                    quantity: quantity
                };

                addToCart(productToAdd);
                document.getElementById('product-modal').style.display = 'none';
                alert('Product added to cart!');
            }
        }
    }

    // Quantity controls
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.onclick = function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        }

        increaseBtn.onclick = function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        }
    }
}

//functions for color and size selection
function selectColor(element, color) {
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => dot.classList.remove('active'));
    element.classList.add('active');
}

function selectSize(element, size) {
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}


// function openProductModal(productId) {
//     const product = products.find(p => p.id === parseInt(productId));
//     if (!product) return;

//     // Update modal content with product details
//     document.getElementById('modal-main-image').src = product.image;
//     document.getElementById('modal-product-name').textContent = product.name;
//     document.getElementById('modal-product-price').textContent = `pkr ${product.price.toFixed(2)}`;
//     document.getElementById('modal-product-description').textContent = product.description;

//     // Update product status
//     const statusElement = document.getElementById('modal-product-status');
//     statusElement.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
//     statusElement.className = `product-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`;

//     // Update color options
//     const colorOptionsContainer = document.getElementById('modal-color-options');
//     colorOptionsContainer.innerHTML = product.colors
//         .map(color => `
//             <div class="color-dot" 
//                  style="background-color: ${color};"
//                  onclick="selectColor(this, '${color}')">
//             </div>
//         `).join('');

//     // Update size options
//     const sizeOptionsContainer = document.getElementById('modal-size-options');
//     sizeOptionsContainer.innerHTML = product.sizes
//         .map(size => `
//             <button class="size-btn" 
//                     onclick="selectSize(this, '${size}')">
//                 ${size}
//             </button>
//         `).join('');

//     // Reset quantity
//     document.getElementById('quantity').value = '1';

//     // Show modal
//     document.getElementById('product-modal').style.display = 'block';
// }

// Function to close modal
// function closeModal() {
//     document.getElementById('product-modal').style.display = 'none';
// }

// // Functions for color and size selection
// function selectColor(element, color) {
//     // Remove active class from all color dots
//     document.querySelectorAll('.color-dot').forEach(dot =>
//         dot.classList.remove('active'));
//     // Add active class to selected color
//     element.classList.add('active');
// }

// function selectSize(element, size) {
//     // Remove active class from all size buttons
//     document.querySelectorAll('.size-btn').forEach(btn =>
//         btn.classList.remove('active'));
//     // Add active class to selected size
//     element.classList.add('active');
// }

// Quantity control functions
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value) + change;
    value = Math.max(1, Math.min(10, value)); // Limit between 1 and 10
    quantityInput.value = value;
}

// Update your event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Your existing event listeners...

    // Add modal event listeners
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('product-modal')) {
            closeModal();
        }
    });

    // Quantity control listeners
    document.getElementById('decrease-quantity').addEventListener('click', () =>
        updateQuantity(-1));
    document.getElementById('increase-quantity').addEventListener('click', () =>
        updateQuantity(1));

    // Update quick view button click handler in displayProducts
    document.querySelector('.product-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-view')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.id;
            openProductModal(productId);
        }
    });
});

