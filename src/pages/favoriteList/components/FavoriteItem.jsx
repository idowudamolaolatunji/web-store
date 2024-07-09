import React, { useState, useEffect } from 'react'
import { currencyConverter, truncateString } from '../../../utils/helper';

import { IoMdHeart, IoIosShareAlt } from 'react-icons/io';
import { IoCartOutline, IoGiftOutline, IoCheckmark } from 'react-icons/io5';

import '../../../components/ItemCard/item.css';
import '../style.css';
import { useFavoriteContext } from '../../../contexts/favoriteContext';
import MiniSpinner from '../../../ui\'s/Spinner/MiniSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../contexts/cartContext';



function FavoriteItem({ item }) {
    const [figureIsHovered, setFigureIsHovered] = useState(false);

    ////////////////////////////////////////////////////////
    const [isLoadingMini, setIsLoadingMini] = useState(false);
    const [isLoadingMiniCart, setIsLoadingMiniCart] = useState(false);
    const [isCartItem, setIsCartItem] = useState(false);

    const navigate = useNavigate();
    const { onToggleFavorite } = useFavoriteContext();
    const { cartItems, onAdd, onRemove } = useCartContext();

    const itemUrl = `/product/${item?.slug}`;
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (item?.discountPercent / 100) * item?.price;
    const discountedPrice = item?.discountPercent ? (item?.price - discountAmount) : item?.price;
    const product = { ...item, selectedColor: 'black', selectedSize: 'l', selectedQuantity: 1, discountedPrice }

    function handleNagivateToItem() {
        navigate(itemUrl);
    }

    function handleAddToFavorite() {
        setIsLoadingMini(true);

        setTimeout(() => {
            setIsLoadingMini(false);
            onToggleFavorite(item);
        }, 1000);
    }

    function handleAddToCart() {
        setIsLoadingMiniCart(true);

        setTimeout(() => {
            setIsLoadingMiniCart(false);
            if(isCartItem) {
                onRemove(item);
            } else {
                onAdd(product)
            }
        }, 1000);
    }

    useEffect(function() {
        const alreadyInCart = cartItems?.find(cartItem => cartItem?._id === item?._id);
        if(alreadyInCart) {
            setIsCartItem(true)
        }
    }, [cartItems])
    


    return (
        <>
            <figure className="product__figure favorite--figure main--desktop">
                <div className="product__figure--img-box" onMouseEnter={() => setFigureIsHovered(true)} onMouseLeave={() => setFigureIsHovered(false)}>
                    <img src={!figureIsHovered ? `${assetUrl + item?.images[0]}` : `${assetUrl + item?.images[1]}`} alt={item?.name} className="product__figure--img" />

                    {(item?.discountPercent && item?.discountPercent !== 0) && (
                        <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                    )}

                    <span className="heart--icon" onClick={handleAddToFavorite}>
                        {isLoadingMini ? (
                            <MiniSpinner isBlack={true} />
                        ) : (
                            <IoMdHeart className='icon' color='#bb0505' />
                        )}
                    </span>

                    <div className="product--icons">
                        <span className="util--icon">
                            <IoGiftOutline className="icon" />
                            <p className='icon-text'>Create as wish</p>
                        </span>
                        <span className="util--icon" >
                            <IoCartOutline className="icon" />
                            <p className='icon-text'>Add to cart</p>
                        </span>
                    </div>
                </div>
                <figcaption className="product__details" onClick={handleNagivateToItem}>
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


            <figure className="product__figure favorite--figure main--mobile">
                <div className="product__figure--img-box">
                    <Link to={itemUrl}>
                        <img src={assetUrl + item?.images[0]} onClick={handleNagivateToItem} alt={item?.name} className="product__figure--img" />
                    </Link>
                    {(item?.discountPercent && item?.discountPercent !== 0) && (
                        <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                    )}
                </div>

                <figcaption className="product__details">
                    <Link to={itemUrl}>
                        <span className="product__figure--name">{truncateString(item?.name, 30)}</span>
                    </Link>
                    {item?.discountPercent ? (
                        <span className="product__figure--prices">
                            <p className="product__figure--main">₦{currencyConverter(discountedPrice)}</p>
                            <p className="product__figure--slashed">₦{currencyConverter(item?.price)}</p>
                        </span>
                    ) : (
                        <p className="product__figure--main" style={{ color: 'inherit' }}>₦{currencyConverter(item?.price)}</p>
                    )}

                    <div className="product__figure--action">
                        <button onClick={handleAddToCart} className={isCartItem ? 'is--added' : ''}>
                            {(isCartItem && !isLoadingMiniCart) ? (
                                <>Added to cart</>
                            ): (!isCartItem && !isLoadingMiniCart) ? (
                                <>
                                    <IoCartOutline className="icon" />
                                    Add to cart
                                </>
                            ) : (
                                <MiniSpinner />
                            )}
                        </button>
                            <span className="heart--icon" onClick={handleAddToFavorite}>
                            {isLoadingMini ? (
                                <MiniSpinner isBlack={true} />
                            ) : (
                                <IoMdHeart className='icon' color='#bb0505' />
                            )}
                        </span>
                        <span className="heart--icon">
                            <IoIosShareAlt className="icon" />
                        </span>
                    </div>
                </figcaption>
            </figure>

        </>
    )
}

export default FavoriteItem
