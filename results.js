document.addEventListener('DOMContentLoaded', () => {
    const prices = {
        "Chill N' Fill": 2000,
        "Sip N' Sit": 2250,
        "Chill N' Fill Deluxe": 3000
    };

    const orderForm = document.getElementById('orderForm');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const totalPriceDisplay = document.getElementById('total-price-display');

    function updateTotalPrice() {
        const selectedProduct = productSelect.selectedOptions[0].textContent.trim();
        const quantity = parseInt(quantityInput.value, 10);
        let totalPrice = 0;

        if (prices.hasOwnProperty(selectedProduct) && !isNaN(quantity)) {
            totalPrice = prices[selectedProduct] * quantity;
        }

        totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;
    }

    if (orderForm) {
        productSelect.addEventListener('change', updateTotalPrice);
        quantityInput.addEventListener('input', updateTotalPrice);

        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const selectedProduct = productSelect.selectedOptions[0].textContent.trim();
            const quantity = parseInt(quantityInput.value, 10);
            const totalPrice = prices[selectedProduct] * quantity;

            const orderDetails = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                product: selectedProduct,
                color: document.getElementById('color').value,
                quantity: quantity,
                price: prices[selectedProduct] || 0,
                totalPrice: totalPrice || 0
            };

            // Log the order details to the console
            console.log('Order submitted:', orderDetails);

            // Redirect to confirmation page with query parameters
            window.location.href = `order_confirmation.html?name=${encodeURIComponent(orderDetails.name)}&product=${encodeURIComponent(orderDetails.product)}&quantity=${encodeURIComponent(orderDetails.quantity)}&address=${encodeURIComponent(orderDetails.address)}&color=${encodeURIComponent(orderDetails.color)}&totalPrice=${encodeURIComponent(orderDetails.totalPrice)}`;
        });
    } else {
        console.error('Order form not found');
    }
});
