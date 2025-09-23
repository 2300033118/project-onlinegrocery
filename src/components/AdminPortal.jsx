// import { useState, useEffect } from 'react';
// import {
//   FiLogOut, FiUsers, FiShoppingBag,
//   FiMessageSquare, FiPlus, FiEdit2, FiTrash2
// } from 'react-icons/fi';
// import { FaChartLine, FaBoxOpen } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import './AdminPortal.css';

// const AdminPortal = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     price: '',
//     category: '',
//     description: '',
//     image: '',
//     stock: ''
//   });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingOrders: 0
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const mockProducts = [
//       { id: 1, name: 'Organic Bananas', price: 100, category: 'Fruits & Vegetables', description: 'Fresh organic bananas', image: 'banana.jpg', stock: 50 },
//       { id: 2, name: 'Fresh Strawberries', price: 500, category: 'Fruits & Vegetables', description: 'Sweet red strawberries', image: 'strawberry.jpg', stock: 30 },
//       { id: 3, name: 'Free Range Eggs', price: 450, category: 'Dairy & Eggs', description: 'Farm fresh eggs', image: 'eggs.jpg', stock: 100 },
//     ];

//     const mockOrders = [
//       { id: 1, customer: 'Bhanu vamsi', products: ['Organic Bananas', 'Free Range Eggs'], total: 550, status: 'Delivered', date: '2023-05-15' },
//       { id: 2, customer: 'Sesha sai', products: ['Fresh Strawberries'], total: 500, status: 'Shipped', date: '2023-05-16' },
//       { id: 3, customer: 'sirish', products: ['Organic Bananas', 'Fresh Strawberries'], total: 600, status: 'Pending', date: '2023-05-17' },
//     ];

//     const mockFeedbacks = [
//       { id: 1, customer: 'Bhanu vamsi', product: 'Organic Bananas', rating: 5, comment: 'Excellent quality!', date: '2023-05-15' },
//       { id: 2, customer: 'Sesha sai', product: 'Fresh Strawberries', rating: 4, comment: 'Very tasty but a bit expensive', date: '2023-05-16' },
//     ];

//     const mockUsers = [
//       { id: 1, name: 'Bhanu vamsi', email: 'Bhanuvamsi@gmail.com', joined: '2023-01-15', orders: 5 },
//       { id: 2, name: 'sesha sai', email: 'seshasai@gmail.com', joined: '2023-02-20', orders: 3 },
//       { id: 3, name: 'sirish', email: 'sirish@gmail.com', joined: '2023-03-10', orders: 2 },
//     ];

//     setProducts(mockProducts);
//     setOrders(mockOrders);
//     setFeedbacks(mockFeedbacks);
//     setUsers(mockUsers);

//     setStats({
//       totalProducts: mockProducts.length,
//       totalOrders: mockOrders.length,
//       totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
//       pendingOrders: mockOrders.filter(order => order.status === 'Pending').length
//     });
//   }, []);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const product = {
//       ...newProduct,
//       id: products.length + 1,
//       price: parseFloat(newProduct.price),
//       stock: parseInt(newProduct.stock)
//     };
//     setProducts([...products, product]);
//     setNewProduct({ name: '', price: '', category: '', description: '', image: '', stock: '' });
//     setActiveTab('products');
//   };

//   const handleUpdateProduct = (e) => {
//     e.preventDefault();
//     const updatedProducts = products.map(product =>
//       product.id === editingProduct.id ? editingProduct : product
//     );
//     setProducts(updatedProducts);
//     setEditingProduct(null);
//     setActiveTab('products');
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(product => product.id !== id));
//   };

//   const handleOrderStatusChange = (id, status) => {
//     const updatedOrders = orders.map(order =>
//       order.id === id ? { ...order, status } : order
//     );
//     setOrders(updatedOrders);
//   };

//   const renderTabContent = () => {
//     if (editingProduct) {
//       return <EditProductTab editingProduct={editingProduct} setEditingProduct={setEditingProduct} handleUpdateProduct={handleUpdateProduct} />;
//     }
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardTab stats={stats} />;
//       case 'products':
//         return <ProductsTab products={products} setEditingProduct={setEditingProduct} handleDeleteProduct={handleDeleteProduct} />;
//       case 'add-product':
//         return <AddProductTab newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} />;
//       case 'orders':
//         return <OrdersTab orders={orders} handleOrderStatusChange={handleOrderStatusChange} />;
//       case 'feedbacks':
//         return <FeedbacksTab feedbacks={feedbacks} />;
//       case 'users':
//         return <UsersTab users={users} />;
//       default:
//         return <DashboardTab stats={stats} />;
//     }
//   };

//   return (
//     <div className="admin-portal">
//       <div className="admin-sidebar">
//         <div className="admin-header"><h2>Mr.Grocery Admin</h2></div>
//         <nav className="admin-nav">
//           <button className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><FaChartLine /> Dashboard</button>
//           <button className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><FaBoxOpen /> Products</button>
//           <button className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><FiShoppingBag /> Orders</button>
//           <button className={`admin-nav-btn ${activeTab === 'feedbacks' ? 'active' : ''}`} onClick={() => setActiveTab('feedbacks')}><FiMessageSquare /> Feedbacks</button>
//           <button className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}><FiUsers /> Users</button>
//           <button className="admin-nav-btn add-product-btn" onClick={() => setActiveTab('add-product')}><FiPlus /> Add Product</button>
//         </nav>
//         <button className="admin-logout-btn" onClick={handleLogout}><FiLogOut /> Logout</button>
//       </div>
//       <div className="admin-content">
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// // Subcomponents

// const DashboardTab = ({ stats }) => (
//   <div className="dashboard-tab">
//     <h2>Dashboard Overview</h2>
//     <div className="stats-grid">
//       <div className="stat-card"><h3>Total Products</h3><p>{stats.totalProducts}</p></div>
//       <div className="stat-card"><h3>Total Orders</h3><p>{stats.totalOrders}</p></div>
//       <div className="stat-card"><h3>Total Revenue</h3><p>Rs.{stats.totalRevenue.toFixed(2)}</p></div>
//       <div className="stat-card"><h3>Pending Orders</h3><p>{stats.pendingOrders}</p></div>
//     </div>
//   </div>
// );

// const ProductsTab = ({ products, setEditingProduct, handleDeleteProduct }) => (
//   <div className="products-tab">
//     <h2>Product Management</h2>
//     <table className="admin-table">
//       <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr></thead>
//       <tbody>
//         {products.map(product => (
//           <tr key={product.id}>
//             <td>{product.id}</td>
//             <td>{product.name}</td>
//             <td>Rs.{product.price.toFixed(2)}</td>
//             <td>{product.category}</td>
//             <td>{product.stock}</td>
//             <td>
//               <button className="edit-btn" onClick={() => setEditingProduct(product)}><FiEdit2 /></button>
//               <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}><FiTrash2 /></button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const AddProductTab = ({ newProduct, setNewProduct, handleAddProduct }) => (
//   <div className="form-tab">
//     <h2>Add New Product</h2>
//     <form onSubmit={handleAddProduct}>
//       {['name', 'price', 'category', 'description', 'image', 'stock'].map(field => (
//         <div className="form-group" key={field}>
//           <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//           <input type="text" value={newProduct[field]} onChange={e => setNewProduct({ ...newProduct, [field]: e.target.value })} required />
//         </div>
//       ))}
//       <button type="submit" className="submit-btn">Add Product</button>
//     </form>
//   </div>
// );

// const EditProductTab = ({ editingProduct, setEditingProduct, handleUpdateProduct }) => (
//   <div className="form-tab">
//     <h2>Edit Product</h2>
//     <form onSubmit={handleUpdateProduct}>
//       {['name', 'price', 'category', 'description', 'image', 'stock'].map(field => (
//         <div className="form-group" key={field}>
//           <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//           <input type="text" value={editingProduct[field]} onChange={e => setEditingProduct({ ...editingProduct, [field]: e.target.value })} required />
//         </div>
//       ))}
//       <button type="submit" className="submit-btn">Update Product</button>
//     </form>
//   </div>
// );

// const OrdersTab = ({ orders, handleOrderStatusChange }) => (
//   <div className="orders-tab">
//     <h2>Orders</h2>
//     <table className="admin-table">
//       <thead><tr><th>ID</th><th>Customer</th><th>Products</th><th>Total</th><th>Status</th><th>Change Status</th></tr></thead>
//       <tbody>
//         {orders.map(order => (
//           <tr key={order.id}>
//             <td>{order.id}</td>
//             <td>{order.customer}</td>
//             <td>{order.products.join(', ')}</td>
//             <td>Rs.{order.total.toFixed(2)}</td>
//             <td>{order.status}</td>
//             <td>
//               <select value={order.status} onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}>
//                 <option>Pending</option>
//                 <option>Shipped</option>
//                 <option>Delivered</option>
//               </select>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const FeedbacksTab = ({ feedbacks }) => (
//   <div className="feedbacks-tab">
//     <h2>Customer Feedbacks</h2>
//     <ul>
//       {feedbacks.map(fb => (
//         <li key={fb.id}><strong>{fb.customer}</strong> ({fb.product}) - Rating: {fb.rating}/5<br />"{fb.comment}"</li>
//       ))}
//     </ul>
//   </div>
// );

// const UsersTab = ({ users }) => (
//   <div className="users-tab">
//     <h2>Registered Users</h2>
//     <table className="admin-table">
//       <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Joined</th><th>Orders</th></tr></thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.joined}</td><td>{user.orders}</td></tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// export default AdminPortal;

import { useState, useEffect } from "react";
import {
  FiLogOut,
  FiUsers,
  FiShoppingBag,
  FiMessageSquare,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { FaChartLine, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminPortal.css";

const API = "http://localhost:8084";

const getImageUrl = (filename) => {
  if (!filename) return "/placeholder.png";
  return `${API}/uploads/${filename}`;
};

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const navigate = useNavigate();

  // ✅ Fetch all data once
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
    fetchFeedbacks();
  }, []);

  // -----------------------
  // FETCH HELPERS
  // -----------------------
  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    setProducts(data);
    setStats((prev) => ({ ...prev, totalProducts: data.length }));
  };

  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/users`);
    const data = await res.json();
    setUsers(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API}/api/orders`);
    const data = await res.json();
    setOrders(data);
    setStats((prev) => ({
      ...prev,
      totalOrders: data.length,
      totalRevenue: data.reduce((sum, o) => sum + o.total, 0),
      pendingOrders: data.filter((o) => o.status === "Pending").length,
    }));
  };

  const fetchFeedbacks = async () => {
    const res = await fetch(`${API}/api/feedbacks`);
    const data = await res.json();
    setFeedbacks(data);
  };

  // -----------------------
  // AUTH
  // -----------------------
  const handleLogout = () => {
    navigate("/login");
  };

  // -----------------------
  // PRODUCT CRUD
  // -----------------------
  const handleAddProduct = async (e, imageFile) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        "product",
        new Blob(
          [
            JSON.stringify({
              name: newProduct.name,
              price: parseFloat(newProduct.price),
              category: newProduct.category,
              description: newProduct.description,
              stock: parseInt(newProduct.stock),
            }),
          ],
          { type: "application/json" }
        )
      );
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save product");
      const saved = await res.json();

      setProducts([...products, saved]);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
      });
      setActiveTab("products");
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("❌ Failed to save product.");
    }
  };

  const handleUpdateProduct = async (id, formData) => {
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();

      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      setEditingProduct(null);
      setActiveTab("products");
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("❌ Error updating product:", err);
      alert("❌ Failed to update product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setProducts(products.filter((p) => p.id !== id));
      alert("🗑️ Product deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("❌ Failed to delete product.");
    }
  };

  // -----------------------
  // ORDERS
  // -----------------------
  const handleOrderStatusChange = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  // -----------------------
  // TABS
  // -----------------------
  const renderTabContent = () => {
    if (editingProduct) {
      return (
        <EditProductTab
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      );
    }
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab stats={stats} />;
      case "products":
        return (
          <ProductsTab
            products={products}
            setEditingProduct={setEditingProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        );
      case "add-product":
        return (
          <AddProductTab
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddProduct={handleAddProduct}
          />
        );
      case "orders":
        return (
          <OrdersTab
            orders={orders}
            handleOrderStatusChange={handleOrderStatusChange}
          />
        );
      case "feedbacks":
        return <FeedbacksTab feedbacks={feedbacks} />;
      case "users":
        return <UsersTab users={users} />;
      default:
        return <DashboardTab stats={stats} />;
    }
  };

  return (
    <div className="admin-portal">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Mr.Grocery Admin</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaChartLine /> Dashboard
          </button>
          <button
            className={`admin-nav-btn ${
              activeTab === "products" ? "active" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FaBoxOpen /> Products
          </button>
          <button
            className={`admin-nav-btn ${
              activeTab === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FiShoppingBag /> Orders
          </button>
          <button
            className={`admin-nav-btn ${
              activeTab === "feedbacks" ? "active" : ""
            }`}
            onClick={() => setActiveTab("feedbacks")}
          >
            <FiMessageSquare /> Feedbacks
          </button>
          <button
            className={`admin-nav-btn ${
              activeTab === "users" ? "active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FiUsers /> Users
          </button>
          <button
            className="admin-nav-btn add-product-btn"
            onClick={() => setActiveTab("add-product")}
          >
            <FiPlus /> Add Product
          </button>
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
      <div className="admin-content">{renderTabContent()}</div>
    </div>
  );
};

// -----------------------
// SUBCOMPONENTS
// -----------------------

const DashboardTab = ({ stats }) => (
  <div className="dashboard-tab">
    <h2>Dashboard Overview</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Products</h3>
        <p>{stats.totalProducts}</p>
      </div>
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>{stats.totalOrders}</p>
      </div>
      <div className="stat-card">
        <h3>Total Revenue</h3>
        <p>Rs.{stats.totalRevenue.toFixed(2)}</p>
      </div>
      <div className="stat-card">
        <h3>Pending Orders</h3>
        <p>{stats.pendingOrders}</p>
      </div>
    </div>
  </div>
);

const ProductsTab = ({ products, setEditingProduct, handleDeleteProduct }) => (
  <div className="products-tab">
    <h2>Product Management</h2>
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              {product.image ? (
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <span>No Image</span>
              )}
            </td>
            <td>{product.name}</td>
            <td>Rs.{product.price.toFixed(2)}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
              <button
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                <FiEdit2 />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AddProductTab = ({ newProduct, setNewProduct, handleAddProduct }) => {
  const [imageFile, setImageFile] = useState(null);

  return (
    <div className="form-tab">
      <h2>Add New Product</h2>
      <form onSubmit={(e) => handleAddProduct(e, imageFile)}>
        {["name", "price", "category", "description", "stock"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              value={newProduct[field]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [field]: e.target.value })
              }
              required
            />
          </div>
        ))}

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

const EditProductTab = ({
  editingProduct,
  setEditingProduct,
  handleUpdateProduct,
}) => {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(editingProduct)], { type: "application/json" })
    );
    if (imageFile) formData.append("imageFile", imageFile);

    handleUpdateProduct(editingProduct.id, formData);
  };

  return (
    <div className="form-tab">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {["name", "price", "category", "description", "stock"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              value={editingProduct[field]}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  [field]: e.target.value,
                })
              }
              required
            />
          </div>
        ))}

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

const OrdersTab = ({ orders, handleOrderStatusChange }) => (
  <div className="orders-tab">
    <h2>Orders</h2>
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Products</th>
          <th>Total</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.products.join(", ")}</td>
            <td>Rs.{order.total.toFixed(2)}</td>
            <td>{order.status}</td>
            <td>
              <select
                value={order.status}
                onChange={(e) =>
                  handleOrderStatusChange(order.id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FeedbacksTab = ({ feedbacks }) => (
  <div className="feedbacks-tab">
    <h2>Customer Feedbacks</h2>
    <ul>
      {feedbacks.map((fb) => (
        <li key={fb.id}>
          <strong>{fb.customer}</strong> ({fb.product}) - Rating: {fb.rating}/5
          <br />"{fb.comment}"
        </li>
      ))}
    </ul>
  </div>
);

const UsersTab = ({ users }) => (
  <div className="users-tab">
    <h2>Registered Users</h2>
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Joined</th>
          <th>Orders</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.joined}</td>
            <td>{user.orders}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPortal;
