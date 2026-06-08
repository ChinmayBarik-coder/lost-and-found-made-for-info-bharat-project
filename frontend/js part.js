const form = document.getElementById('itemForm');
const itemsList = document.getElementById('itemsList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const item = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    location: document.getElementById('location').value,
    contact: document.getElementById('contact').value
  };

  // Send to backend (Node.js API)
  const res = await fetch('http://localhost:5000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });

  const data = await res.json();
  addItemToList(data);
});

function addItemToList(item) {
  const li = document.createElement('li');
  li.textContent = `${item.title} (${item.category}) - ${item.location} | Contact: ${item.contact}`;
  itemsList.appendChild(li);
}

// Load items from backend
(async () => {
  const res = await fetch('http://localhost:5000/api/items');
  const data = await res.json();
  data.forEach(addItemToList);
})();
