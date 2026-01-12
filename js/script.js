document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    // 1. Scroll Effect (Header Shrink)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // 3. Number Counter Animation (Impact Stats)
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200; 

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const count = parseInt(counter.innerText);
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
                observer.unobserve(counter); // Only animate once
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounter, { threshold: 0.8 });
    counters.forEach(counter => counterObserver.observe(counter));
});

document.addEventListener('DOMContentLoaded', () => {
    const visionBadge = document.getElementById('vision-badge');
    
    if (visionBadge) {
        // 1. Get the current year from the system clock
        const currentYear = new Date().getFullYear();
        
        // 2. Define your vision text (You can change this part easily)
        const visionText = "Vision"; 
        
        // 3. Update the badge content (e.g., "2026 Vision")
        visionBadge.textContent = `${currentYear} ${visionText}`;
    }
});