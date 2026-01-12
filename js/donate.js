document.addEventListener('DOMContentLoaded', () => {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('customAmount');
    const form = document.getElementById('donateForm');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            customInput.value = '';
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const amount = document.querySelector('.amount-btn.active')?.dataset.amount || customInput.value;
        alert(`Thank you for your generous donation of ₹${amount}! We will contact you shortly.`);
        form.reset();
        amountBtns[0].classList.add('active');
    });
});
