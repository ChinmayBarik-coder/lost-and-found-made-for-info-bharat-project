import React, { useState, useEffect } from "react";
import ItemForm from "./projects/proj1";
import ItemList from "./projects/proj2";

function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormSubmit = async (item) => {
    await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    setShowForm(false);
    fetchItems();
  };

  return (
    <div>
      <header style={{ background: "#0077cc", color: "white", padding: "1rem" }}>
        <h1>Lost & Found Portal</h1>
        <nav>
          <button onClick={() => { setCategory("lost"); setShowForm(true); }}>Report Lost Item</button>
          <button onClick={() => { setCategory("found"); setShowForm(true); }}>Report Found Item</button>
          <button onClick={fetchItems}>View All Items</button>
        </nav>
      </header>

      {showForm && (
        <ItemForm category={category} onSubmit={handleFormSubmit} />
      )}

      <ItemList items={items} />
    </div>
  );
}

export default App;
