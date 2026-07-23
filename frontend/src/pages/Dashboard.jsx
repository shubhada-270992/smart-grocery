import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getProducts } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    low_stock_products: 0,
    todays_sales: 0,
    total_revenue: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Guard: Redirect to login if not authenticated
  useEffect(() => {
    const session = localStorage.getItem('grocery_token');
    if (!session) {
      navigate('/login');
    }
  }, [navigate]);

  // Refresh stats and product list
  const refreshData = async () => {
    const [statsData, productsData] = await Promise.all([
      getDashboardStats(),
      getProducts(),
    ]);
    setStats(statsData);
    setProducts(productsData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(''); // Reset error state on new fetch attempt
        await refreshData();
      } catch (err) {
        setError(err.message || 'Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if logged in
    if (localStorage.getItem('grocery_token')) {
      fetchData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('grocery_token');
    localStorage.removeItem('grocery_user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Inventory Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="logo-icon">🍏</span>
          <h1>Smart Grocery Portal</h1>
        </div>
        <div className="user-profile">
          <span className="welcome-text">Welcome, <strong>Admin</strong></span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {error && <div className="error-banner">⚠ {error}</div>}

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-blue">📦</div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p className="stat-value">{stats.total_products}</p>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon bg-orange">⚠</div>
            <div className="stat-info">
              <h3>Low Stock Products</h3>
              <p className="stat-value text-orange">{stats.low_stock_products}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-green">📈</div>
            <div className="stat-info">
              <h3>Today's Sales</h3>
              <p className="stat-value text-green">${stats.todays_sales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-purple">💰</div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-value text-purple">${stats.total_revenue.toFixed(2)}</p>
            </div>
          </div>
        </section>

        {/* Products Table */}
        <section className="table-container">
          <div className="table-header">
            <h2>Inventory Stock List</h2>
          </div>
          <table className="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={product.quantity < 10 ? 'row-warning' : ''}>
                  <td><strong>{product.name}</strong></td>
                  <td><span className="badge-category">{product.category}</span></td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.quantity < 10 ? (
                      <span className="badge-warning">⚠ Low Stock</span>
                    ) : (
                      <span className="badge-success">In Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
