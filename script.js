// Card click action
function handleCardClick(sectionName) {
    console.log(sectionName + " clicked!");
    alert("Aap ne select kiya: " + sectionName);
}

// Scroll to top function for navbar brand click
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search live filter event listener
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        console.log("Searching for:", query);
        
        // Agar aap chahte hain ke search karne par cards filter hon, 
        // toh aap yahan apna logic add kar sakte hain.
    });
}
