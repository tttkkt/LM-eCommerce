// Credit card validation and icon display
document.getElementById('cardNumber').addEventListener('input', function(e) {
    // Remove any non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Format the number with spaces every 4 digits
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formattedValue;

    // Validate card type
    const cardType = getCardType(value);
    displayCardIcon(cardType);
});

function getCardType(number) {
    // Card patterns
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/,
        dinersclub: /^3(?:0[0-5]|[68])/,
        jcb: /^(?:2131|1800|35)/
    };

    // Test the number against each pattern
    for (const [card, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) {
            return card;
        }
    }
    return 'unknown';
}

function displayCardIcon(cardType) {
    const iconContainer = document.getElementById('card-type-icon');
    const iconMap = {
        visa: '<i class="fab fa-cc-visa" style="color: #1A1F71;"></i>',
        mastercard: '<i class="fab fa-cc-mastercard" style="color: #EB001B;"></i>',
        amex: '<i class="fab fa-cc-amex" style="color: #2E77BC;"></i>',
        discover: '<i class="fab fa-cc-discover" style="color: #FF6000;"></i>',
        dinersclub: '<i class="fab fa-cc-diners-club" style="color: #0079BE;"></i>',
        jcb: '<i class="fab fa-cc-jcb" style="color: #0B4EA2;"></i>',
        unknown: '<i class="fas fa-credit-card" style="color: #888888;"></i>'
    };

    iconContainer.innerHTML = iconMap[cardType] || iconMap.unknown;
}

// Add maxlength to inputs
document.getElementById('cardNumber').maxLength = 19; // 16 digits + 3 spaces
document.getElementById('expiry').maxLength = 5;     // MM/YY
document.getElementById('cvv').maxLength = 4;        // Some cards have 4-digit CVV
