import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Layout from '../Layout/Layout';
import { useCart } from '../Context/CartContext';
import StarRating from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success('Item added to cart successfully!', {
            position: 'top-right'
        });
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const calculateTotalPrice = () => {
        return (product.price * quantity).toFixed(2);
    };

    return (
        <Layout>
            <ToastContainer />
            {error && <div>Error: {error}</div>}
            {loading ? (
                <div className="container">
                    <div className="heading-section">
                        <Skeleton height={30} width={200} />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Skeleton height={400} />
                        </div>
                        <div className="col-md-6">
                            <div className="product-dtl">   
                                <Skeleton height={30} width={300} />
                                <Skeleton count={5} />
                                <div className="row">
                                    <div className="col-md-6">
                                        <Skeleton height={50} />
                                    </div>
                                    <div className="col-md-6">
                                        <Skeleton height={50} />
                                    </div>
                                </div>
                                <Skeleton height={50} width={150} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                product && (
                    <div className="container">
                        <div className="heading-section">
                            <h2>Product Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div id="slider" className="owl-carousel product-slider">
                                    <div className="item">
                                        <img
                                            src={product.image}
                                            width='80%'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.title}</div>

                                        {product.rating && (
                                            <div className="reviews-counter">
                                                <div className="rate">
                                                    <StarRating
                                                        rating={product.rating.rate}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        starDimension="25px"
                                                        starSpacing="2px"
                                                    />
                                                </div>
                                                <span>{product.rating.count} reviews</span>
                                            </div>
                                        )}
                                        <div className="product-price-discount">
                                            <span>${calculateTotalPrice()}</span>
                                        </div>
                                    </div>
                                    <p>{product.description}</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="size">Size</label>
                                            <select id="size" name="size" className="form-control">
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="color">Color</label>
                                            <select id="color" name="color" className="form-control">
                                                <option>Blue</option>
                                                <option>Green</option>
                                                <option>Red</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="product-count">
                                        <label htmlFor="size">Quantity</label>
                                        <form action="#" className="display-flex">
                                            <div className="display-flex">
                                                <div className="qtyminus" onClick={decreaseQuantity}>-</div>
                                                <input type="text" name="quantity" value={quantity} readOnly className="qty" />
                                                <div className="qtyplus" onClick={increaseQuantity}>+</div>
                                            </div>
                                        </form>
                                        <button className="round-black-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </Layout>
    );
};

export default ProductDetails;
