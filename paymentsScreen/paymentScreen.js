document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const form = document.getElementById('checkout-form');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    displayOrderSummary(cartItems);

    // Initialize form
    updateFormDisplay();

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            currentStep++;
            updateFormDisplay();
        }
    });

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateFormDisplay();
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            processOrder();
        }
    });

    // Payment method change handler
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const creditCardDetails = document.getElementById('credit-card-details');
            creditCardDetails.style.display = 
                e.target.value === 'credit-card' ? 'block' : 'none';
        });
    });

    // Input formatting
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    document.getElementById('expiryDate').addEventListener('input', formatExpiryDate);
    document.getElementById('cvv').addEventListener('input', formatCVV);

    function updateFormDisplay() {
        // Update progress steps
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.toggle('active', stepNum === currentStep);
        });

        // Show/hide form sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`#${getStepId(currentStep)}`).classList.add('active');

        // Update buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.style.display = currentStep === 3 ? 'none' : 'block';
        submitBtn.style.display = currentStep === 3 ? 'block' : 'none';
    }

    function validateCurrentStep() {
        const currentSection = document.querySelector(`#${getStepId(currentStep)}`);
        const inputs = currentSection.querySelectorAll('input[required], select[required]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    function getStepId(step) {
        const steps = {
            1: 'personal-details',
            2: 'shipping-details',
            3: 'payment-details'
        };
        return steps[step];
    }

    function displayOrderSummary(items) {
        const cartItemsContainer = document.getElementById('cart-items');
        let subtotal = 0;

        const itemsHTML = items.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return `
                <div class="cart-item">
                    <div class="item-info">
                        <span class="item-name">${item.name}
                        <span class="item-quantity">×${item.quantity}
                    </div>
                    <span class="item-price">$${itemTotal.toFixed(2)}
                </div>
            `;
        }).join('');

        cartItemsContainer.innerHTML = itemsHTML;

        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + shipping;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    function processOrder() {
        // Collect form data
        const formData = new FormData(form);
        const orderData = {
            personal: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            shipping: {
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipCode: formData.get('zipCode'),
                country: formData.get('country')
            },
            payment: {
                method: formData.get('payment-method'),
                cardNumber: formData.get('cardNumber'),
                expiryDate: formData.get('expiryDate'),
                cvv: formData.get('cvv'),
                cardName: formData.get('cardName')
            },
            items: cartItems
        };

        // Console log the order data
        console.log('Order Data:', orderData);

        // Clear cart and redirect to homepage
        localStorage.removeItem('cartItems');
        alert('Order placed successfully!');
        window.location.href = '../homePageScreen/homePage.html';
    }

    // Input formatting functions
    function formatCardNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
    }

    function formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2);
        }
        e.target.value = value;
    }

    function formatCVV(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }
    document.addEventListener('DOMContentLoaded', () => {
        // Your existing code...
    
        // Populate country dropdown
        const countries = [
            { code: 'US', name: 'United States' },
            { code: 'GB', name: 'United Kingdom' },
            { code: 'CA', name: 'Canada' },
            { code: 'AU', name: 'Australia' },
            { code: 'DE', name: 'Germany' },
            { code: 'FR', name: 'France' },
            { code: 'IT', name: 'Italy' },
            { code: 'ES', name: 'Spain' },
            { code: 'BR', name: 'Brazil' },
            { code: 'JP', name: 'Japan' },
            { code: 'CN', name: 'China' },
            { code: 'IN', name: 'India' },
            { code: 'RU', name: 'Russia' },
            { code: 'ZA', name: 'South Africa' },
            { code: 'MX', name: 'Mexico' },
            { code: 'KE', name: 'Kenya' },
            { code: 'NG', name: 'Nigeria' },
            { code: 'GH', name: 'Ghana' },
            { code: 'ET', name: 'Ethiopia' },
            { code: 'EG', name: 'Egypt' },
            { code: 'SA', name: 'Saudi Arabia' },
            { code: 'AE', name: 'United Arab Emirates' },
            { code: 'IL', name: 'Israel' },
            { code: 'TR', name: 'Turkey' },
            { code: 'SE', name: 'Sweden' },
            { code: 'NO', name: 'Norway' },
            { code: 'DK', name: 'Denmark' },
            { code: 'FI', name: 'Finland' },
            { code: 'NL', name: 'Netherlands' },
            { code: 'BE', name: 'Belgium' }
        ];
    
        function populateCountries() {
            const countrySelect = document.getElementById('country');
            
            // Sort countries alphabetically
            countries.sort((a, b) => a.name.localeCompare(b.name));
    
            // Add default option
            countrySelect.innerHTML = '<option value="">Select Country</option>';
    
            // Add countries to select
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
    
            // Add change event listener
            countrySelect.addEventListener('change', handleCountryChange);
        }
    
        function handleCountryChange(e) {
            const selectedCountry = e.target.value;
            const stateField = document.getElementById('state');
            const zipLabel = document.querySelector('label[for="zipCode"]');
    
            // Clear state field
            stateField.value = '';
    
            // Update labels and placeholders based on country
            if (selectedCountry === 'US') {
                stateField.placeholder = 'Enter State (e.g., CA)';
                zipLabel.textContent = 'ZIP Code*';
            } else if (selectedCountry === 'GB') {
                stateField.placeholder = 'Enter County';
                zipLabel.textContent = 'Postal Code*';
            } else if (selectedCountry === 'CA') {
                stateField.placeholder = 'Enter Province (e.g., ON)';
                zipLabel.textContent = 'Postal Code*';
            } else {
                stateField.placeholder = 'Enter State/Province';
                zipLabel.textContent = 'Postal/ZIP Code*';
            }
    
            // Add validation for specific country formats
            const zipField = document.getElementById('zipCode');
            zipField.value = ''; // Clear existing value
    
            // Set pattern attribute based on country
            switch(selectedCountry) {
                case 'US':
                    zipField.pattern = '\\d{5}(-\\d{4})?';
                    zipField.placeholder = '12345 or 12345-6789';
                    break;
                case 'GB':
                    zipField.pattern = '[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}';
                    zipField.placeholder = 'SW1A 1AA';
                    break;
                case 'CA':
                    zipField.pattern = '[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]';
                    zipField.placeholder = 'A1A 1A1';
                    break;
                default:
                    zipField.pattern = '.*';
                    zipField.placeholder = 'Enter postal code';
            }
        }
    
        // Style the select element
        function styleCountrySelect() {
            const countrySelect = document.getElementById('country');
            
            countrySelect.style.appearance = 'none';
            countrySelect.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`;
            countrySelect.style.backgroundRepeat = 'no-repeat';
            countrySelect.style.backgroundPosition = 'right 1rem center';
            countrySelect.style.backgroundSize = '1em';
        }
    
        // Initialize country dropdown
        populateCountries();
        styleCountrySelect();
    });
    
});
