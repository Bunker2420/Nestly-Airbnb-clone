const searchInput = document.querySelector('.Search');
const btn = document.querySelector('.btn');
const resultDiv = document.querySelector('.result');
const cards = document.querySelectorAll('.container .card');

// Input event
searchInput.addEventListener('input', async () => {
    const filter = searchInput.value.toLowerCase();
    let found = false;

    // Clear previous "No Results" message
    resultDiv.innerHTML = "";

    cards.forEach((card) => {
        const location = card.querySelector('.country').textContent.toLowerCase();
        if (location.includes(filter)) {
            card.parentElement.style.display = "";
            found = true;
        } else {
            card.parentElement.style.display = "none";
        }
    });

    // Show "No Results" only once if nothing matches
    if (!found && filter.trim() !== "") {
        const res = document.createElement("h2");
        res.textContent = "No Results found!";
        res.style.fontWeight = "bold";
        res.style.textAlign ="center";
        resultDiv.appendChild(res);
    }
});

// Button click event
btn.addEventListener('click', async () => {
    const filter = searchInput.value.toLowerCase();
    let found = false;

    // Clear previous "No Results" message
    resultDiv.innerHTML = "";

    cards.forEach((card) => {
        const location = card.querySelector('.country').textContent.toLowerCase();
        if (location.includes(filter)) {
            card.parentElement.style.display = "";
            found = true;
        } else {
            card.parentElement.style.display = "none";
        }
    });

    // Show "No Results" only once if nothing matches
    if (!found && filter.trim() !== "") {
        const res = document.createElement("h2");
        res.textContent = "No Results found!";
        res.style.fontWeight = "bold";
        res.style.textAlign ="center";
        resultDiv.appendChild(res);
    }
});
