document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#search-input');
    const clearButton = document.querySelector('#clear-button');
  
searchInput.addEventListener('focus', () => {
    searchContainer.classList.add('spotlight');
});

searchInput.addEventListener('blur', () => {
    searchContainer.classList.remove('spotlight');
});

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    updateClearButtonVisibility();
});

searchInput.addEventListener('input', updateClearButtonVisibility);

function updateClearButtonVisibility() {
    if (searchInput.value) {
    clearButton.style.display = 'block';
    } else {
    clearButton.style.display = 'none';
    }
}

updateClearButtonVisibility();
});