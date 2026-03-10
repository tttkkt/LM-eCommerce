// Global variables
let currentStep = 1;

// Progress bar management
function updateProgress() {
    document.querySelectorAll('.step-number').forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
            document.querySelectorAll('.step-title')[index].classList.add('active');
        } else {
            step.classList.remove('active');
            document.querySelectorAll('.step-title')[index].classList.remove('active');
        }
    });
}

// Step navigation functions
function showStep(step) {
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
    updateProgress();
}

function nextStep(step) {
    if (validateCurrentStep(currentStep)) {
        showStep(step);
        window.scrollTo(0, 0);
    }
}

function prevStep(step) {
    showStep(step);
    window.scrollTo(0, 0);
}

// Selection handlers
function selectPayment(element) {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Show/hide credit card form based on selection
    const creditCardForm = document.getElementById('credit-card-form');
    creditCardForm.style.display = element.querySelector('h3').textContent === 'Credit Card' ? 'block' : 'none';
}

function selectDelivery(element) {
    document.querySelectorAll('.delivery-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
    updateTotalPrice();
}

// Loading state management
function showLoading() {
    document.querySelector('.loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.querySelector('.loading-overlay').style.display = 'none';
}

// Form validation
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    field.classList.remove('error');
    errorElement.style.display = 'none';
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    });
}
function validateCurrentStep(step) {
    let isValid = true;
    const currentStepElement = document.getElementById(`step${step}`);
    
    // Reset previous error states
    currentStepElement.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
        // Clear existing error messages
        const errorSpan = el.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    });
    
    switch(step) {
        case 2:
            // Validate personal details
            const validations = {
                firstName: {
                    field: document.getElementById('firstName'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'First name is required'
                        }
                    ]
                },
                lastName: {
                    field: document.getElementById('lastName'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'Last name is required'
                        }
                    ]
                },
                email: {
                    field: document.getElementById('email'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'Email is required'
                        },
                        {
                            test: value => isValidEmail(value),
                            message: 'Please enter a valid email address'
                        }
                    ]
                },
                phone: {
                    field: document.getElementById('phone'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'Phone number is required'
                        }
                    ]
                },
                address: {
                    field: document.getElementById('address'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'Address is required'
                        }
                    ]
                },
                city: {
                    field: document.getElementById('city'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'City is required'
                        }
                    ]
                },
                postalCode: {
                    field: document.getElementById('postalCode'),
                    rules: [
                        {
                            test: value => value.trim().length > 0,
                            message: 'Country/Region is required'
                        }
                    ]
                }
            };

            // Validate each field
            Object.entries(validations).forEach(([fieldId, validation]) => {
                const field = validation.field;
                const value = field.value;

                // Check each rule for the field
                for (const rule of validation.rules) {
                    if (!rule.test(value)) {
                        showFieldError(field, rule.message);
                        isValid = false;
                        break;
                    }
                }
            });

            // Validate delivery option
            const deliveryOptions = document.querySelector('.delivery-options');
            if (!document.querySelector('.delivery-option.selected')) {
                showFieldError(deliveryOptions, 'Please select a delivery option');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element if it doesn't exist
    let errorSpan = field.parentElement.querySelector('.error-message');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        field.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

// Add event listeners to clear errors on input
document.addEventListener('DOMContentLoaded', function() {
    const clearFieldError = (element) => {
        element.classList.remove('error');
        const errorSpan = element.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    };

    // Clear errors on input fields when typing
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Clear error on delivery options when selecting
    document.querySelectorAll('.delivery-option').forEach(option => {
        option.addEventListener('click', function() {
            const deliveryOptions = document.querySelector('.delivery-options');
            clearFieldError(deliveryOptions);
        });
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(number) {
    const cleaned = number.replace(/\D/g, '');
    return cleaned.length === 16;
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
}

function updateTotalPrice() {
    const selectedDelivery = document.querySelector('.delivery-option.selected');
    if (selectedDelivery) {
        const basePrice = 5242000; // HK$5,242,000
        const deliveryPrice = selectedDelivery.querySelector('h3').textContent === 'Priority Delivery' ? 50000 : 0;
        const totalPrice = basePrice + deliveryPrice;
        
        // Update total price display
        document.querySelectorAll('.price-total span:last-child').forEach(el => {
            el.textContent = `HK$${totalPrice.toLocaleString()}`;
        });
    }
}

