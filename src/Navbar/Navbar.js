import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import CartModal from '../components/CartModal';

const Navbar = () => {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
        <div className="container">
          <a className="navbar-brand" href="">BShop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarContent">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About</a></li>
              <li className={`nav-item dropdown ${showDropdown ? 'show' : ''}`}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded={showDropdown} onClick={toggleDropdown}>Shop</a>
                <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                  <li><a className="dropdown-item" href="#">All Products</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" href="#">Popular Items</a></li>
                  <li><a className="dropdown-item" href="#">New Arrivals</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <button className="btn btn-outline-light" onClick={handleShowCart}>
                <span className="bi bi-basket2-fill me-1"></span>
                Cart items
                <span className="badge bg-light text-dark rounded-pill ms-1">{cart.length}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartModal show={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
