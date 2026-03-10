// wishlist.js
function initializeSidebar() {
    const sidebar = $('.wishlist-sidebar');
    const sidebarOverlay = $('.sidebar-overlay');
    const closeSidebarBtn = $('.close-sidebar');

    // Function to update wishlist count badge
    function updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const count = wishlist.length;
        const wishlistCount = $('.wishlist-count');
        
        wishlistCount.text(count);
        
        // Toggle 'hidden' class based on count
        if (count === 0) {
            wishlistCount.addClass('hidden');
        } else {
            wishlistCount.removeClass('hidden');
        }
    }

    // Function to display wishlist items
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
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h4 class="item-name">${item.name} - ${item.model}</h4>
                            <p>${item.color}</p>
                            <p>${item.wheels}</p>
                            <p class="price">HK$${item.totalPrice.toLocaleString()}</p>
                        </div>
                        <a class="checkout-btn checkout-btn-color" href="checkout.html">
                            <span class="checkout-btn-name">Check Out</span>
                            <i class="checkout-btn-icon fa fa-arrow-right"></i>
                        </a>
                        <button class="remove-item" data-index="${index}">&times;</button>
                    </div>
                `);
            });
        }

        $('.total-amount').text(`HK$${totalAmount.toLocaleString()}`);
        updateWishlistCount(); // Update the count badge

        // Add event listeners for clickable items
        $('.item-image, .item-name').on('click', function () {
            window.location.href = `car-details.html`;
        });

        // Add event listeners for remove buttons
        $('.remove-item').on('click', function() {
            const index = $(this).data('index');
            let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            displayWishlistItems();
            updateWishlistCount(); // Update the count badge after removing item
        });
    }

    // Function to open the sidebar
    function openSidebar() {
        sidebar.addClass('active');
        sidebarOverlay.show();
        $('body').css('overflow', 'hidden');
        displayWishlistItems();
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.removeClass('active');
        sidebarOverlay.hide();
        $('body').css('overflow', 'auto');
    }

    // Event listeners
    $('.cart-link').on('click', function(e) {
        e.preventDefault();
        openSidebar();
    });
    
    $('.wishlist-btn').on('click', function(){
        openSidebar();
    });

    closeSidebarBtn.on('click', closeSidebar);
    sidebarOverlay.on('click', closeSidebar);

    // Initialize wishlist display and count when sidebar is loaded
    displayWishlistItems();
    updateWishlistCount();
}

// Make sure to call initializeSidebar when the document is ready
$(document).ready(function() {
    initializeSidebar();
});
