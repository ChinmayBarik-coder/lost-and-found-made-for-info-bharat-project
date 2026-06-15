import React, { useState, useEffect } from 'react';
import './App.css'; 

const initialMockData = [
  { id: 1, type: 'lost', title: 'Sony Wireless Headphones', category: 'electronics', location: 'University Library', date: '2023-10-24', desc: 'Black WH-1000XM4. Left them on a desk on the 3rd floor.', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80' },
  { id: 2, type: 'found', title: 'Car Keys with Leather Fob', category: 'keys', location: 'Downtown Coffee Shop', date: '2023-10-25', desc: 'Toyota keys found near the entrance patio.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80' },
  { id: 3, type: 'lost', title: 'Brown Leather Wallet', category: 'documents', location: 'Subway Station', date: '2023-10-26', desc: 'Contains ID and several cards. Reward offered!', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80' },
  { id: 4, type: 'found', title: 'Golden Retriever Dog', category: 'pets', location: 'Central Park', date: '2023-10-27', desc: 'Friendly dog, wearing a red collar but no tags.', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80' },
];

export default function App() {
  // --- States for Items and Filters ---
  const [items, setItems] = useState(initialMockData);
  const [filteredItems, setFilteredItems] = useState(initialMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  
  // --- States for Modals ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // --- States for User Authentication ---
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginData, setLoginData] = useState({ name: '', password: '' });

  // --- States for Form Data ---
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    category: 'electronics',
    location: '',
    date: '',
    desc: ''
  });

  // Filter Logic
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || 
                            item.location.toLowerCase().includes(query) || 
                            item.desc.toLowerCase().includes(query);
      
      const matchesType = currentFilter === 'all' || 
                          item.type === currentFilter || 
                          item.category === currentFilter;
      
      return matchesSearch && matchesType;
    });
    setFilteredItems(filtered);
  }, [searchQuery, currentFilter, items]);

  // Handle Report Form Inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle Login Form Inputs
  const handleLoginInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
  };

  // --- Handle Login Submission ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 1. Show the success alert with the user's name
    alert(`login successfully ${loginData.name}`);
    
    // 2. Set the user as logged in and close the modal
    setLoggedInUser(loginData.name);
    setIsLoginModalOpen(false);
    
    // 3. Clear the login form
    setLoginData({ name: '', password: '' });
  };

  // --- Handle Report Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: Date.now(),
      img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=80' 
    };

    setItems(prev => [newItem, ...prev]);
    setIsModalOpen(false);
    setFormData({ type: 'lost', title: '', category: 'electronics', location: '', date: '', desc: '' }); 
    
    // Trigger the exact alert you requested
    setTimeout(() => alert('report item successfully'), 100);
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="logo"><i className="fas fa-radar"></i> LOST & FOUND </div>
        <div className="nav-actions">
          
          {/* Dynamic Login/Logout Button */}
          {loggedInUser ? (
            <button onClick={() => setLoggedInUser(null)}>
              Logout ({loggedInUser})
            </button>
          ) : (
            <button onClick={() => setIsLoginModalOpen(true)}>Sign In</button>
          )}

          <button onClick={() => alert('Admin panel requires authentication.')}>Admin</button>
          <button className="btn-post" onClick={() => setIsModalOpen(true)}>
            <i className="fas fa-plus"></i> Report Item
          </button>
        </div>
      </nav>

      {/* Header & Search */}
      <header>
        <h1>Find What You Lost. <br /> Return What You Found.</h1>
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search by item name, category, or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filters">
          {['all', 'lost', 'found', 'electronics', 'keys'].map((filterType) => (
            <button 
              key={filterType}
              className={`filter-btn ${currentFilter === filterType ? 'active' : ''}`} 
              onClick={() => setCurrentFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Items
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid-container">
        {filteredItems.length === 0 ? (
          <h3 style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px' }}>
            No matching items found.
          </h3>
        ) : (
          filteredItems.map(item => (
            <div className="card" key={item.id}>
              <img src={item.img} className="card-img" alt={item.title} />
              <span className={`badge ${item.type}`}>{item.type}</span>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p><i className="fas fa-map-marker-alt"></i> {item.location}</p>
                <p><i className="far fa-calendar-alt"></i> {item.date}</p>
                <p><i className="fas fa-tag"></i> <span style={{ textTransform: 'capitalize' }}>{item.category}</span></p>
                <p className="desc">{item.desc}</p>
                <button className="btn-connect" onClick={() => alert('Secure messaging initiated!')}>
                  <i className="fas fa-comment-dots"></i> Contact {item.type === 'lost' ? 'Owner' : 'Finder'}
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* --- Login Modal --- */}
      <div className={`modal-overlay ${isLoginModalOpen ? 'active' : ''}`}>
        <div className="modal" style={{ maxWidth: '400px' }}>
          <div className="modal-header">
            <h2>Sign In</h2>
            <button className="close-btn" onClick={() => setIsLoginModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                value={loginData.name} 
                onChange={handleLoginInputChange} 
                placeholder="Enter your name" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={loginData.password} 
                onChange={handleLoginInputChange} 
                placeholder="Enter your password" 
                required 
              />
            </div>
            <button type="submit" className="btn-submit" style={{ marginTop: '10px' }}>Login</button>
          </form>
        </div>
      </div>

      {/* --- Post Item Modal --- */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header">
            <h2>Report an Item</h2>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Report Type</label>
              <select id="type" value={formData.type} onChange={handleInputChange} required>
                <option value="lost">I lost something</option>
                <option value="found">I found something</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">Item Name</label>
              <input type="text" id="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., MacBook Pro" required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" value={formData.category} onChange={handleInputChange} required>
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="keys">Keys</option>
                <option value="pets">Pets</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Terminal 2" required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={formData.date} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <textarea id="desc" rows="3" value={formData.desc} onChange={handleInputChange} placeholder="Provide distinct features..." required></textarea>
            </div>
            <button type="submit" className="btn-submit">Submit Report</button>
          </form>
        </div>
      </div>
    </>
  );
}