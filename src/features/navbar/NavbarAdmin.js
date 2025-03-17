function NavbarAdmin() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Suman Enterprises</h1>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#dashboard">Dashboard</a>
        </li>
        <li>
          <a href="#add-product">Add Product</a>
        </li>
        <li>
          <a href="#users">Users</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#product-list">Product List</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
