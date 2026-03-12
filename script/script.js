// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Skills - Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");

                const categorie = item.categorie.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-");

                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body d-flex flex-column align-items-center">
                            <span class="badge badge-${categorie} mb-2 align-self-start">${item.categorie}</span>
                            <img src="./assets/images/${item.image}" alt="${item.alt}">
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-2">${item.text}</p>
                        </div>
                    </div>
`;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Portfolio - Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                const tags = item.tags.map(tag =>
                    `<span class="portfolio-tag">${tag}</span>`
                ).join("");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="./assets/images/${item.image}" alt="${item.alt}">
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title">${item.title}</h3>
                                <div class="portfolio-tags">${tags}</div>
                                <p class="card-text">${item.text}</p>
                                <div class="text-center mt-auto">
                                    <a href="${item.link}" target="_blank" class="btn btn-portfolio">Consulter</a>
                                </div>
                        </div>
                    </div>
`;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
