import React, { useState } from 'react';
import './App.css';

export default function App() {
  // --- State Management ---
  const [items, setItems] = useState([
    { id: 1, type: 'lost', name: 'Car Keys with Leather Strap', location: 'Cafeteria, Table 4', date: 'Just now', icon: 'fa-key' },
    { id: 2, type: 'found', name: 'Black Wireless Earbuds', location: 'Lecture Hall B', date: '2 hours ago', icon: 'fa-headphones' },
    { id: 3, type: 'lost', name: 'MacBook Charger', location: 'Library, 2nd Floor', date: 'Yesterday', icon: 'fa-plug' },
    { id: 4, type: 'found', name: 'Calculus Textbook', location: 'Main Office', date: '3 days ago', icon: 'fa-book' }
  ]);

  // UI States (Modals)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Feature States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form States
  const [formData, setFormData] = useState({ type: 'lost', name: '', location: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // --- Helper Functions ---
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if(lowerName.includes('key')) return 'fa-key';
    if(lowerName.includes('phone') || lowerName.includes('mobile')) return 'fa-mobile-screen';
    if(lowerName.includes('bag')) return 'fa-bag-shopping';
    if(lowerName.includes('book')) return 'fa-book';
    if(lowerName.includes('card') || lowerName.includes('wallet')) return 'fa-wallet';
    return 'fa-box'; 
  };

  // --- Handlers ---
  const handleReportClick = () => {
    if (isAuthenticated) {
      setIsReportModalOpen(true);
    } else {
      alert("Please login first to report an item!");
      setIsLoginModalOpen(true);
    }
  };

  // *** LOGIN SUBMIT HANDLER WITH ALERT ***
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login successfully"); // <-- Alert added here
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    setLoginData({ username: '', password: '' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // *** REPORT SUBMIT HANDLER WITH ALERT ***
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert("Report successfully"); // <-- Alert added here
    
    const newItem = {
      id: Date.now(),
      type: formData.type,
      name: formData.name,
      location: formData.location,
      date: 'Just now',
      icon: getIcon(formData.name)
    };
    
    setItems([newItem, ...items]);
    setIsReportModalOpen(false);
    setFormData({ type: 'lost', name: '', location: '' });
  };

  // Filter items based on search query
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="container">
        
        {/* Navigation */}
        <nav className="glass">
          <div className="logo">
            <i className="fa-solid fa-radar"></i> Echo
          </div>
          
          <div className="nav-controls">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isAuthenticated ? (
              <button className="btn btn-outline" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            ) : (
              <button className="btn btn-outline" onClick={() => setIsLoginModalOpen(true)}>
                <i className="fa-solid fa-user"></i> Login
              </button>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <h1>Lost it? Found it?<br/>Let's Echo it out.</h1>
          <p>The modern, centralized hub to report missing belongings or declare items you've found across campus.</p>
          <button className="btn btn-primary" onClick={handleReportClick}>
            <i className="fa-solid fa-plus"></i> Report an Item
          </button>
        </section>

        {/* Item Grid */}
        <section className="grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="glass card">
                <div className={`badge ${item.type}`}>{item.type}</div>
                <i className={`fa-solid ${item.icon} card-icon`}></i>
                <h3>{item.name}</h3>
                <p><i className="fa-solid fa-location-dot"></i> {item.location}</p>
                <p><i className="fa-regular fa-clock"></i> {item.date}</p>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fa-solid fa-ghost"></i>
              <h3>No items found</h3>
              <p>Try adjusting your search terms.</p>
            </div>
          )}
        </section>
      </div>

      {/* --- Modals --- */}

      {/* 1. Login Modal */}
      <div className={`modal-overlay ${isLoginModalOpen ? 'active' : ''}`} onClick={(e) => {
        if(e.target.className.includes('modal-overlay')) setIsLoginModalOpen(false);
      }}>
        <div className="glass modal-content">
          <div className="modal-header">
            <h2>Welcome Back</h2>
            <button className="close-btn" onClick={() => setIsLoginModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" placeholder="Enter any username" required 
                value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter any password" required 
                value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary submit-btn">Login</button>
          </form>
        </div>
      </div>

      {/* 2. Report Item Modal */}
      <div className={`modal-overlay ${isReportModalOpen ? 'active' : ''}`} onClick={(e) => {
        if(e.target.className.includes('modal-overlay')) setIsReportModalOpen(false);
      }}>
        <div className="glass modal-content">
          <div className="modal-header">
            <h2>Report Item</h2>
            <button className="close-btn" onClick={() => setIsReportModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onSubmit={handleReportSubmit}>
            <div className="form-group">
              <label>Report Type</label>
              <select className="form-control" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required>
                <option value="lost">I Lost Something</option>
                <option value="found">I Found Something</option>
              </select>
            </div>
            <div className="form-group">
              <label>Item Name</label>
              <input type="text" className="form-control" placeholder="e.g., Blue Notebook" required 
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" className="form-control" placeholder="e.g., Central Library" required 
                value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary submit-btn">Submit Report</button>
          </form>
        </div>
      </div>

    </div>
  );
}