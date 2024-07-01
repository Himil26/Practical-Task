import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import Skeleton from 'react-loading-skeleton';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Item added to cart successfully!', {
      position: 'top-right' 
    });
  };

  return (
    <Layout>
      <ToastContainer /> 
      {error && <div>Error: {error}</div>}
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
              <div className="col mb-5" key={index}>
                <div className="card h-100">
                  <Skeleton height={300} />
                  <div className="card-body text-center">
                    <h5 className="card-title"><Skeleton width={100} /></h5>
                    <p className="card-text"><Skeleton count={2} /></p>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <Skeleton height={40} width={`80%`} />
                  </div>
                </div>
              </div>
            ))
            : products.map((product) => (
              <div className="col mb-5" key={product.id}> 
                <div className="card h-100">
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div class="badge bg-danger text-white position-absolute mt-1 ms-1">Product</div>
                    <img className="card-img-top" src={product.image} alt={product.title} width="450" height="300" />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">${product.price}</p>
                      <StarRating
                        rating={product.rating.rate} 
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    </div>
                  </Link>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center d-flex gap-3">
                    <button
                      className="btn btn-outline-dark mt-auto btn-sm"
                      onClick={() => {
                        handleAddToCart(product); 
                      }}
                    >
                      <span className="bi bi-cart4"></span> Add to cart
                    </button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark mt-auto ms-2 btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
