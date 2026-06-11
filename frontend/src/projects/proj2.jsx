import React from "react";

function ItemList({ items }) {
  return (
    <section style={{ padding: "1rem" }}>
      <h2>Items List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {items.map((item) => (
          <div key={item._id} style={{ background: "white", padding: "1rem", borderRadius: "6px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><em>{item.category.toUpperCase()}</em></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ItemList;
