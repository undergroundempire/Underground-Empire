// Live Search Filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card-banner');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.getAttribute('data-title');
            if (title.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Navbar active class switcher & Smooth click effects
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const sectionName = this.getAttribute('data-section');
            console.log(`Navigated to: ${sectionName}`);
        });
    });

    // Card click events simulation
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const songTitle = card.querySelector('h2').innerText;
            alert(`Opening ${songTitle} section...`);
        });
    });
});
