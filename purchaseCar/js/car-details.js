$(document).ready(function() {
    const colorBubbles = $('.color-bubble');
    const modelOptions = $('.model-options .option');
    const carImage = $('.car-image');
    const colorNameSpan = $('.color-name');
    const wishlistBtn = $('.wishlist-btn');

    // Color names mapping
    const colorNames = {
        'black': 'Midnight Black',
        'gold': 'Royal Gold',
        'red': 'Racing Red',
        'purple': 'Royal Purple',
        'green': 'Forest Green',
        'blue': 'Ocean Blue'
    };

    // Color prices mapping
    const colorPrices = {
        'black': 'HK$97,000',
        'gold': 'HK$98,000',
        'red': 'HK$97,000',
        'purple': 'HK$97,000',
        'green': 'HK$97,000',
        'blue': 'HK$99,000'
    };

    // Model prices mapping
    const modelPrices = {
        'rear-wheel': 234200,
        'long-range': 277200,
        'performance': 333300
    };

    // Keep track of selected options
    let selectedOptions = {
        model: 'rear-wheel',
        color: 'black',
        wheels: 'privilege'
    };

    // Handle model selection
    modelOptions.on('click', function() {
        modelOptions.removeClass('selected');
        $(this).addClass('selected');
        selectedOptions.model = $(this).data('model');
    });

    // Handle color selection
    colorBubbles.on('click', function() {
        colorBubbles.removeClass('selected');
        $(this).addClass('selected');
        
        const color = $(this).data('color');
        selectedOptions.color = color;
        
        carImage.attr('src', `car_img/car-${color}.jpeg`);
        colorNameSpan.html(`Color - ${colorNames[color]} <span class="price">${colorPrices[color]}</span>`);
    });

    // Sidebar functionality
    const cartLink = $('.cart-link');
    const sidebar = $('.wishlist-sidebar');
    const sidebarOverlay = $('.sidebar-overlay');
    const closeSidebarBtn = $('.close-sidebar');

    function openSidebar() {
        sidebar.addClass('active');
        sidebarOverlay.show();
        $('body').css('overflow', 'hidden');
        displayWishlistItems();
    }

    function closeSidebar() {
        sidebar.removeClass('active');
        sidebarOverlay.hide();
        $('body').css('overflow', 'auto');
    }

    cartLink.on('click', function(e) {
        e.preventDefault();
        openSidebar();
    });

    closeSidebarBtn.on('click', closeSidebar);
    sidebarOverlay.on('click', closeSidebar);

    function displayWishlistItems() {
        const wishlistContainer = $('.wishlist-items');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        let totalAmount = 0;

        wishlistContainer.empty();

        if (wishlist.length === 0) {
            wishlistContainer.html('<p class="empty-wishlist">Your wishlist is empty</p>');
        } else {
            wishlist.forEach((item, index) => {
                totalAmount += item.totalPrice;
                wishlistContainer.append(`
                    <div class="wishlist-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name} - ${item.model}</h4>
                            <p>${item.color}</p>
                            <p>${item.wheels}</p>
                            <p class="price">HK$${item.totalPrice.toLocaleString()}</p>
                        </div>
                        <button class="remove-item" data-index="${index}">&times;</button>
                    </div>
                `);
            });
        }

        $('.total-amount').text(`HK$${totalAmount.toLocaleString()}`);

        // Add event listeners for remove buttons
        $('.remove-item').on('click', function() {
            const index = $(this).data('index');
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            displayWishlistItems();
        });
    }

    // Wishlist button click handler
    wishlistBtn.on('click', function() {
        const selectedModel = $(`.option[data-model="${selectedOptions.model}"]`);
        const modelName = selectedModel.find('h3').text();
        
        const wishlistItem = {
            name: 'Lily Royce',
            model: modelName,
            color: colorNames[selectedOptions.color],
            wheels: '18" Privilege Wheels',
            basePrice: modelPrices[selectedOptions.model],
            colorPrice: parseInt(colorPrices[selectedOptions.color].replace(/[^0-9]/g, '')),
            totalPrice: modelPrices[selectedOptions.model] + parseInt(colorPrices[selectedOptions.color].replace(/[^0-9]/g, '')),
            image: carImage.attr('src')
        };

        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlist.push(wishlistItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Open sidebar and refresh display
        openSidebar();
    });

    // Initialize with default selections
    modelOptions.first().addClass('selected');
    colorBubbles.first().addClass('selected');
});
