import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaLeaf, FaAppleAlt, FaBreadSlice, FaWineBottle } from 'react-icons/fa';
import { GiMeat, GiMilkCarton, GiFrozenOrb } from 'react-icons/gi';
import './Homepage.css';
import { Link, useNavigate } from 'react-router-dom';

import bg1 from './Static/123.avif';
import bg2 from './Static/456.avif';
import bg3 from './Static/abc2.jpg';
import bg4 from './Static/456.avif';

const Homepage = () => {
  const API = "http://localhost:8084";
  const navigate = useNavigate();

  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCart.length);
  const [cartProducts, setCartProducts] = useState(initialCart);
  const [products, setProducts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const cartRef = useRef();
  const cartIconRef = useRef();

  const backgrounds = [
    { image: bg1, overlay: 'rgba(0, 0, 0, 0.3)' },
    { image: bg2, overlay: 'rgba(0, 0, 0, 0.4)' },
    { image: bg3, overlay: 'rgba(0, 0, 0, 0.2)' },
    { image: bg4, overlay: 'rgba(0, 0, 0, 0.3)' },
  ];

  const categories = [
    { name: 'Fruits', icon: <FaAppleAlt /> },
    { name: 'Meat & Seafood', icon: <GiMeat /> },
    { name: 'Dairy & Eggs', icon: <GiMilkCarton /> },
    { name: 'Bakery', icon: <FaBreadSlice /> },
    { name: 'Beverages', icon: <FaWineBottle /> },
    { name: 'Frozen Foods', icon: <GiFrozenOrb /> },
    { name: 'Organic', icon: <FaLeaf /> },
  ];

  // ✅ Avoids broken URLs
  const getImageUrl = (filename) => {
    if (!filename) return "/placeholder.png";
    if (filename.startsWith("http")) {
      return filename;
    }
    return `${API}/uploads/${filename}`;
  };

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    setCartItems(cartProducts.length);
  }, [cartProducts]);

  // Fetch products
  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Background auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Close cart on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCart &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !cartIconRef.current.contains(event.target)
      ) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCart]);

  // Cart functions
  const addToCart = (product) => setCartProducts([...cartProducts, product]);
  const removeFromCart = (id) => setCartProducts(cartProducts.filter(p => p.id !== id));
  const toggleProfile = () => { setShowProfile(!showProfile); setShowCart(false); };
  const toggleCart = () => { setShowCart(!showCart); setShowProfile(false); };

  // ✅ Calculate total
  const totalAmount = cartProducts.reduce((sum, p) => sum + p.price, 0);

  // ✅ Navigate to checkout with total
  const handleCheckout = () => {
    navigate("/checkout", { state: { total: totalAmount } });
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app">
      {/* Background */}
      <div className="background-overlay" style={{ backgroundColor: backgrounds[backgroundIndex].overlay }}></div>
      <img src={backgrounds[backgroundIndex].image} alt="Background" className="background-image" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="logo">GROCERY SHOPPING</h1>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/home">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
            <Link to="/contactus" target="_blank">Contact</Link>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="nav-right">
          <div className="cart-icon" onClick={toggleCart} ref={cartIconRef}>
            <FiShoppingCart />
            {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
          </div>
          {showCart && (
            <div className="cart-dropdown" ref={cartRef}>
              <h4>Your Cart ({cartItems})</h4>
              {cartProducts.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cartProducts.map((product, index) => (
                      <div key={index} className="cart-item">
                        <img src={getImageUrl(product.image)} alt={product.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <span>{product.name}</span>
                          <span>Rs.{product.price.toFixed(2)}</span>
                          <button className="remove-item-btn" onClick={() => removeFromCart(product.id)}>×</button>
                        </div>
                      </div>
                    ))}
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>Rs.{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* ✅ Updated checkout button */}
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </>
              ) : <p>Your cart is empty</p>}
            </div>
          )}
          <div className="profile-icon" onClick={toggleProfile}><FiUser /></div>
          {showProfile && (
            <div className="profile-dropdown">
              <a href="/profile">View Profile</a>
              <a href="/orders">My Orders</a>
              <a href="/settings">Settings</a>
              <a href="/prehome">Logout</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h2>Fresh Groceries Delivered to Your Door</h2>
          <p>Shop the best quality products at affordable prices</p>
          <button className="button1">Shop now</button>
        </div>
      </section>

      <div className="content-wrapper">
        {/* Categories */}
        <section className="categories">
          <h3>Shop by Category</h3>
          <div className="category-grid">
            {categories.map((c, i) => (
              <div
                key={i}
                className={`category-card ${selectedCategory === c.name ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === c.name ? null : c.name)}
              >
                <div className="category-icon">{c.icon}</div><p>{c.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="featured-products">
          <h3>{selectedCategory ? `${selectedCategory}` : 'All Products'}</h3>
          <div className="product-grid">
            {filteredProducts.length > 0 ? filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-image"><img src={getImageUrl(p.image)} alt={p.name} /></div>
                <h4>{p.name}</h4>
                <p>Rupees : {p.price.toFixed(2)}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            )) : <p>No products available</p>}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Homepage;
