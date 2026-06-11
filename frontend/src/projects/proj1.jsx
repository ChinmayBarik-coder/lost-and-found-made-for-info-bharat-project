import React, { useState } from "react";

function ItemForm({ category, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, location, contact, category });
    setTitle(""); setDescription(""); setLocation(""); setContact("");
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Report {category.toUpperCase()} Item</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Item Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Info" required />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ItemForm;
