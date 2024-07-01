import React from 'react';
import { useCart } from '../Context/CartContext';
import CartItem from './CartItem';
import Layout from '../Layout/Layout';

const Cart = () => {
  const { cart, clearCart } = useCart();

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

