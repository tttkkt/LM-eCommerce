document.addEventListener('DOMContentLoaded', function() {
    // Fetch orders from JSON file
    fetch('json/orders.json')
        .then(response => response.json())
        .then(data => {
            const accordion = document.querySelector('.accordion');
            const template = document.getElementById('order-template');

            // Create accordion items for each order
            data.orders.forEach(order => {
                const clone = template.content.cloneNode(true);
                
                // Set order summary information
                clone.querySelector('.order-image').src = "car_img/car-black-tran.png";
                clone.querySelector('.order-number').textContent = order.vehicle.name;
                clone.querySelector('.order-date').textContent = order.orderDate;
                clone.querySelector('.order-status').textContent = order.status;
                clone.querySelector('.order-status').classList.add(`status-${order.status.toLowerCase()}`);
                clone.querySelector('.order-total').textContent = order.total;

                // Set vehicle details
                clone.querySelector('.summary-vehicle-image').alt = order.vehicle.name;
                clone.querySelector('.vehicle-config-details h4').textContent = `Order #${order.orderNumber}`;
                clone.querySelector('.vehicle-variant').textContent = order.vehicle.variant;
                
                const optionsList = clone.querySelector('.vehicle-options');
                order.vehicle.options.forEach(option => {
                    const li = document.createElement('li');
                    li.textContent = option;
                    optionsList.appendChild(li);
                });

                // Set personal details
                const personalDetails = clone.querySelector('.personal-details');
                Object.entries(order.personalInfo).forEach(([key, value]) => {
                    const div = document.createElement('div');
                    div.className = 'detail-item';
                    div.innerHTML = `
                        <span class="detail-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span class="detail-value">${value}</span>
                    `;
                    personalDetails.appendChild(div);
                });

                // Set delivery details
                const deliveryDetails = clone.querySelector('.delivery-details');
                Object.entries(order.delivery).forEach(([key, value]) => {
                    const div = document.createElement('div');
                    div.className = 'detail-item';
                    div.innerHTML = `
                        <span class="detail-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span class="detail-value">${value}</span>
                    `;
                    deliveryDetails.appendChild(div);
                });

                // Set payment details
                const paymentMethod = clone.querySelector('.payment-method-info');
                paymentMethod.innerHTML = `
                    <i class="fas fa-credit-card"></i>
                    <span>${order.payment.method}</span>
                    <p>${order.payment.cardNumber}</p>
                `;

                const priceBreakdown = clone.querySelector('.price-breakdown');
                order.payment.breakdown.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'price-item' + (item.label === 'Total Amount' ? ' total' : '');
                    div.innerHTML = `
                        <span>${item.label}</span>
                        <span>${item.value}</span>
                    `;
                    priceBreakdown.appendChild(div);
                });

                accordion.appendChild(clone);
            });

            // Add click event listeners to accordion headers
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.parentElement;
                    const isActive = item.classList.contains('active');

                    // Close all accordion items
                    document.querySelectorAll('.accordion-item').forEach(accordionItem => {
                        accordionItem.classList.remove('active');
                    });

                    // Open clicked item if it wasn't already active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading orders:', error);
            document.querySelector('.accordion').innerHTML = '<p class="error">Error loading orders. Please try again later.</p>';
        });
});
