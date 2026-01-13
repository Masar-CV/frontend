import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-logo">Masar</h1>
        <nav className="navbar-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/notifications">Notifications</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

