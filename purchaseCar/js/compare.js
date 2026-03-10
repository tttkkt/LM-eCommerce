document.addEventListener('DOMContentLoaded', function() {
    // Initialize comparison state
    let selectedCars = [];
    const maxCompareCars = 3;
    let carSpecs = {};

// Load car specifications
fetch('json/car_specs.json')
    .then(response => response.json())
    .then(data => {
    carSpecs = data;
    initializeComparison();
    })
    .catch(error => console.error('Error loading car specs:', error));

function initializeComparison() {
    // Add floating compare bar
    const compareBar = createCompareBar();
    document.body.appendChild(compareBar);

    // Create and add comparison modal
    const modal = createComparisonModal();
    document.body.appendChild(modal);

    // Add click handlers to all compare buttons
    document.querySelectorAll('.compare-item .button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const carItem = this.closest('.compare-item');
        const carName = carItem.querySelector('h3').textContent;
        toggleCarSelection(carName, this);
    });
    });
}

function createCompareBar() {
    const bar = document.createElement('div');
    bar.className = 'compare-bar';
    bar.innerHTML = `
    <div class="compare-bar-content">
        <div class="selected-cars"></div>
        <div class="compare-bar-buttons">
        <button class="compare-now-btn" style="display: none;">Compare Now</button>
        <button class="clear-compare-btn" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        </div>
    </div>
    `;

    bar.querySelector('.compare-now-btn').addEventListener('click', showComparisonModal);
    bar.querySelector('.clear-compare-btn').addEventListener('click', clearComparison);

    return bar;
}

function createComparisonModal() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'comparison-modal';
    modalContainer.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
        <h2>Compare Models</h2>
        <button class="close-modal">&times;</button>
        </div>
        <div class="comparison-grid">
        <!-- Comparison content will be dynamically inserted here -->
        </div>
    </div>
    `;

    modalContainer.querySelector('.close-modal').addEventListener('click', () => {
    modalContainer.style.display = 'none';
    });

    modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
    }
    });

    return modalContainer;
}

function toggleCarSelection(carName, button) {
    const index = selectedCars.indexOf(carName);
    
    if (index === -1) {
    if (selectedCars.length < maxCompareCars) {
        selectedCars.push(carName);
        button.classList.add('selected');
        button.textContent = 'Remove from comparison';
        updateCompareBar();
    } else {
        showNotification('You can compare up to 3 cars at a time');
    }
    } else {
    selectedCars.splice(index, 1);
    button.classList.remove('selected');
    button.textContent = 'Compare';
    updateCompareBar();
    }
}

function updateCompareBar() {
    const compareBar = document.querySelector('.compare-bar');
    const selectedCarsContainer = compareBar.querySelector('.selected-cars');
    const compareNowBtn = compareBar.querySelector('.compare-now-btn');
    const clearCompareBtn = compareBar.querySelector('.clear-compare-btn');

    selectedCarsContainer.innerHTML = selectedCars.map(carName => `
    <div class="selected-car">
        <img src="${carSpecs[carName].image}" alt="${carName}">
        <span>${carName}</span>
    </div>
    `).join('');

    if (selectedCars.length > 0) {
    compareBar.classList.add('active');
    compareNowBtn.style.display = 'block';
    clearCompareBtn.style.display = 'block';
    } else {
    compareBar.classList.remove('active');
    compareNowBtn.style.display = 'none';
    clearCompareBtn.style.display = 'none';
    }
}

function showComparisonModal() {
    const modal = document.querySelector('.comparison-modal');
    const comparisonGrid = modal.querySelector('.comparison-grid');

    const specs = [
    'image', 'acceleration', 'topSpeed', 'range', 'price', 'power', 'torque',
    'weight', 'driveTrain', 'battery', 'chargingTime', 'seating', 'body'
    ];

    comparisonGrid.innerHTML = `
    <table class="comparison-table">
        <thead>
        <tr>
            <th>Specifications</th>
            ${selectedCars.map(carName => `<th>${carName}</th>`).join('')}
        </tr>
        </thead>
        <tbody>
        ${specs.map(spec => `
            <tr class="${spec === 'image' ? 'image-row' : ''}">
            <td>${spec.charAt(0).toUpperCase() + spec.slice(1)}</td>
            ${selectedCars.map(carName => `
                <td>
                ${spec === 'image' 
                    ? `<img src="${carSpecs[carName][spec]}" alt="${carName}">`
                    : carSpecs[carName][spec]}
                </td>
            `).join('')}
            </tr>
        `).join('')}
        </tbody>
    </table>
    `;

    modal.style.display = 'flex';
}

function clearComparison() {
    document.querySelectorAll('.compare-item .button.selected').forEach(button => {
    button.classList.remove('selected');
    button.textContent = 'Compare';
    });

    selectedCars = [];

    const compareBar = document.querySelector('.compare-bar');
    compareBar.classList.remove('active');
    compareBar.querySelector('.compare-now-btn').style.display = 'none';
    compareBar.querySelector('.clear-compare-btn').style.display = 'none';
    compareBar.querySelector('.selected-cars').innerHTML = '';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
    notification.remove();
    }, 3000);
}
});