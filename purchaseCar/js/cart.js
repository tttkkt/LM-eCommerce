document.addEventListener('DOMContentLoaded', function() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cartContainer = document.getElementById('cart-container');
  
    if (wishlist.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }
  
    wishlist.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.model}">
        </div>
        <div class="cart-item-details">
          <h3>${item.name} - ${item.model}</h3>
          <p>Color: ${item.color}</p>
          <p>Wheels: ${item.wheels}</p>
          <p>Base Price: HK$${item.basePrice.toLocaleString()}</p>
          <p>Color Price: HK$${item.colorPrice.toLocaleString()}</p>
          <p class="total-price">Total: HK$${item.totalPrice.toLocaleString()}</p>
        </div>
      `;
      cartContainer.appendChild(itemElement);
    });
  });