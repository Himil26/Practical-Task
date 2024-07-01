import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/product/${item.id}`}>
            <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">${item.price}</p>
            </Link>
            <StarRating
              rating={item.rating.rate}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
            />
            <button className="btn btn-danger mt-2" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
