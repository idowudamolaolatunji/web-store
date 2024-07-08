import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/cartContext';
import { useFavoriteContext } from '../../contexts/favoriteContext';
import MiniSpinner from '../../ui\'s/Spinner/MiniSpinner';
import { currencyConverter, truncateString } from '../../utils/helper';

import { IoMdHeart } from 'react-icons/io';
import { IoCartOutline, IoEyeOutline, IoGiftOutline } from 'react-icons/io5';

import "./item.css";

function ItemCard({ item }) {
    const [figureIsHovered, setFigureIsHovered] = useState(false);
    const [isLoadingMini, setIsLoadingMini] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCartItem, setIsCartItem] = useState(false);

    const { cartItems, onAdd } = useCartContext();
    const { favItems, onToggleFavorite } = useFavoriteContext();
    const navigate = useNavigate();
    
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (item?.discountPercent / 100) * item?.price;
    const discountedPrice = item?.discountPercent ? (item?.price - discountAmount) : item?.price;


    const selectedProduct = {
        ...item,
        selectedColor: 'black',
        selectedSize: 'l',
        selectedQuantity: 1,
        discountedPrice
    }

    function handleAddToCart() {
        onAdd(selectedProduct, 1);
    }

    function handleAddToFavorite() {
        setIsLoadingMini(true);
        
        setTimeout(() => {
            setIsLoadingMini(false);
            onToggleFavorite(item);
        }, 1000);
    }

    function handleNavToProduct() {
        navigate(`/product/${item?.slug}`)
    }

    useEffect(function() {
        const isFavoriteItem = favItems?.find(fav => fav?._id === item._id);
        if(isFavoriteItem) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favItems]);


    useEffect(function() {
        const isInCart = cartItems?.find(cartItem => cartItem?._id === item?._id);
        if(isInCart) {
            setIsCartItem(true);
        } else {
            setIsCartItem(false);
        }
    }, [cartItems]);


  return (
    <figure className="product__figure">
        <div className="product__figure--img-box" onMouseEnter={() => setFigureIsHovered(true)} onMouseLeave={() => setFigureIsHovered(false)}>
            <img src={!figureIsHovered ? `${assetUrl + item?.images[0]}` : `${assetUrl + item?.images[1]}`} alt={item?.name} className="product__figure--img" onClick={handleNavToProduct} />

            {(item?.discountPercent && item?.discountPercent !== 0) && (
                <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
            )}

            <span className="heart--icon" onClick={handleAddToFavorite}>
                {isLoadingMini ? (
                    <MiniSpinner isBlack={true} />
                ) : (
                    <IoMdHeart className='icon' style={ isFavorite ? { color: 'red' } : {} } />
                )}

            </span>

            <div className="product--icons">
                <span className="util--icon">
                    <IoGiftOutline className="icon" />
                    <p className='icon-text'>Add to wishlist</p>
                </span>
                <span className="util--icon">
                    <IoEyeOutline className="icon" />
                    <p className='icon-text'>quick view</p>
                </span>
                <span className={`util--icon ${isCartItem ? 'item-unclikable' : ''}`} onClick={handleAddToCart}>
                    <IoCartOutline className="icon" />
                    <p className='icon-text'>Add to cart</p>
                </span>
            </div>
        </div>

        <figcaption className="product__details" onClick={handleNavToProduct}>
            <span className="product__figure--name">{truncateString(item?.name, 30)}</span>
            {item?.discountPercent ? (
                <span className="product__figure--prices">
                    <p className="product__figure--main">₦{currencyConverter(discountedPrice)}</p>
                    <p className="product__figure--slashed">₦{currencyConverter(item?.price)}</p>
                </span>

            ) : (
                <p className="product__figure--main" style={{ color: 'inherit' }}>₦{currencyConverter(item?.price)}</p>
            )}
        </figcaption>
    </figure>
  )
}

export default ItemCard
