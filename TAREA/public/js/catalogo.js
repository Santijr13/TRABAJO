document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const cartIcon = document.getElementById('cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-btn');
    const cartItemsElem = document.getElementById('cart-items');
    const cartTotalElem = document.getElementById('cart-total');
    const confirmButton = document.getElementById('confirm-purchase');
    let cart = [];
    let totalPrice = 0;

    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productName = product.getAttribute('data-product-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            cart.push({ name: productName, price: productPrice });
            totalPrice += productPrice;

            updateCartUI();
        });
    });

    function updateCartUI() {
        cartItemsElem.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElem = document.createElement('p');
            itemElem.textContent = `${item.name} - $${item.price}`;
            cartItemsElem.appendChild(itemElem);
        });

        cartTotalElem.textContent = totalPrice.toFixed(2);
        document.getElementById('cart-count').textContent = cart.length;
    }

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    confirmButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Compra confirmada. Total: $${totalPrice.toFixed(2)}`);
            cart = [];
            totalPrice = 0;
            updateCartUI();
            cartModal.style.display = 'none';
        } else {
            alert("Tu carrito está vacío.");
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});
