import React from 'react';
import { useCart } from '../Context/CartContext'; 
import { Modal, Button } from 'react-bootstrap';
import '../styles/CartModal.css';

const CartModal = ({ show, handleClose }) => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart(); 

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0).toFixed(2);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header >
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item row align-items-center">
                  <div className="col-2">
                    <img className="img-fluid" src={item.image} alt={item.title} />
                  </div>
                  <div className="col-4">
                    <div className="item-category text-muted">{item.category}</div>
                    <div className="item-title">{item.title}</div>
                  </div>
                  <div className="col-2 text-right">
                    €{calculateSubtotal(item).toFixed(2)}
                  </div>
                  <div className="col-2">
                    <div className="input-group quantity-group">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>&#10005;</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
            <div><h5><b>Summary</b></h5></div>
            <hr></hr>
              <div className="summary-details">
                <div className="summary-item">
                  <span className="text-muted">ITEMS {cart.length}</span>
                  <span>€{calculateTotal()}</span>
                </div>
                <div className="summary-item">
                  <span className="text-muted">SHIPPING</span>
                  <span>Standard-Delivery- €5.00</span>
                </div>
                <div className="summary-item">
                  <span className="text-muted">GIVE CODE</span>
                  <input type="text" className="form-control" placeholder="Enter your code" />
                </div>
                <div className="summary-item">
                  <span className="text-muted">TOTAL PRICE</span>
                  <span>€{(parseFloat(calculateTotal()) + 5).toFixed(2)}</span>
                </div>
              </div>
              <Button variant="dark" className="checkout-btn">CHECKOUT</Button>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} href="/" class="btn">
          Back to Shop
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
