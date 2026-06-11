const API_URL = "http://localhost:3000/items";

// Fetch and display items
async function fetchItems() {
    const res = await fetch(API_URL);
    const items = await res.json();
    displayItems(items);
}

// Display items in the container
function displayItems(items) {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-card";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span>Status: ${item.status}</span>
        `;
        container.appendChild(div);
    });
}

// Handle form submission
document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, status })
    });

    e.target.reset();
    fetchItems();
});

// Search filter
document.getElementById("search").addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();
    const res = await fetch(API_URL);
    const items = await res.json();
    const filtered = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
    displayItems(filtered);
});

fetchItems();