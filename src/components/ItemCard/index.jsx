import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/cartContext';
import { useFavoriteContext } from '../../contexts/favoriteContext';
import MiniSpinner from '../../ui\'s/Spinner/MiniSpinner';
import { currencyConverter, truncateString } from '../../utils/helper';

import { IoMdHeart } from 'react-icons/io';

import "./item.css";
import { useWindowSize } from 'react-use';
import { TbEyeSearch, TbShoppingCart, TbShoppingCartCheck } from 'react-icons/tb';
import { HiGiftTop } from 'react-icons/hi2';

function ItemCard({ item, grid }) {
    const [figureIsHovered, setFigureIsHovered] = useState(false);
    const [isLoadingMiniFav, setIsLoadingMiniFav] = useState(false);
    const [isLoadingMiniCart, setIsLoadingMiniCart] = useState(false);
    const [isLoadingMiniWish, setIsLoadingMiniWish] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCartItem, setIsCartItem] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { width } = useWindowSize()
    const { cartItems, onAdd } = useCartContext();
    const { favItems, onToggleFavorite } = useFavoriteContext();

    
    const itemUrl = `/product/${item?.slug}`
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (item?.discountPercent / 100) * item?.price;
    const discountedPrice = item?.discountPercent ? (item?.price - discountAmount) : item?.price;
    const homeStyles = (location.pathname === '/' && width < 385);
    const collectionStyles = (grid === 1 && width < 410);

    const selectedProduct = {...item, selectedColor: 'black', selectedSize: 'l', selectedQuantity: 1, discountedPrice }

    function handleAddToWishlist() {}

    function handleAddToCart() {
        if(isCartItem) return;
        setIsLoadingMiniCart(true);
        
        setTimeout(function() {
            setIsLoadingMiniCart(false);
            onAdd(selectedProduct, 1);
        }, 500);
    }

    function handleAddToFavorite() {
        setIsLoadingMiniFav(true);
        
        setTimeout(() => {
            setIsLoadingMiniFav(false);
            onToggleFavorite(item);
        }, 1000);
    }

    function handleNavToProduct() {
        navigate(itemUrl)
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
    <>
        <figure className="product__figure main--desktop">
            <div className="product__figure--img-box" onMouseEnter={() => setFigureIsHovered(true)} onMouseLeave={() => setFigureIsHovered(false)}>
                <img src={!figureIsHovered ? `${assetUrl + item?.images[0]}` : `${assetUrl + item?.images[1]}`} alt={item?.name} className="product__figure--img" onClick={handleNavToProduct} />

                {(item?.discountPercent && item?.discountPercent > 0) ? (
                    <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                ) : (<></>)}

                <span className="heart--icon" onClick={handleAddToFavorite}>
                    {isLoadingMiniFav ? (
                        <MiniSpinner isBlack={true} />
                    ) : (
                        <IoMdHeart className='icon' style={ isFavorite ? { color: '#bb0505' } : {} } />
                    )}
                </span>

                <div className="product--icons">
                    <span className="util--icon">
                        <HiGiftTop className="icon" />
                        <p className='icon-text'>Add to wishlist</p>
                    </span>
                    <span className="util--icon">
                        <TbEyeSearch className="icon" />
                        <p className='icon-text'>quick view</p>
                    </span>
                    <span className={`util--icon ${isCartItem ? 'item-unclikable' : ''}`} onClick={handleAddToCart}>
                        {isCartItem ? (
                            <TbShoppingCartCheck className="icon" />
                        ) : (
                            <TbShoppingCart className="icon" />
                        )}
                        <p className='icon-text'>Add to cart</p>
                    </span>
                </div>
            </div>

            <figcaption className="product__details" onClick={handleNavToProduct}>
                <span className="product__figure--name">
                    {((width >= 800 && grid === 4) || width >= 800) ? (
                        <>
                            {truncateString(item?.name, 25)}
                        </>
                    ) : (
                        <>{item?.name}</>
                    )}
                </span>
                {item?.discountPercent ? (
                    <span className="product__figure--prices">
                        <p className="product__figure--main">₦{currencyConverter(discountedPrice)}</p>
                        <p className="product__figure--slashed">₦{currencyConverter(item?.price)}</p>
                    </span>

                ) : (
                    <span className="product__figure--prices">
                        <p className="product__figure--main" style={{ color: '#555' }}>₦{currencyConverter(item?.price)}</p>
                    </span>
                )}
            </figcaption>
        </figure>


        <figure className="product__figure main--mobile">
            <div className="product__figure--img-box" onClick={() => (!collectionStyles || !homeStyles) ? handleAddToFavorite : ''}>
                <img src={assetUrl + item?.images[0]} alt={item?.name} className="product__figure--img" onClick={handleNavToProduct} />

                {(item?.discountPercent && item?.discountPercent > 0) ? (
                    <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                ) : (<></>)}

                <span className="heart--icon" onClick={handleAddToFavorite}>
                    {isLoadingMiniFav ? (
                        <MiniSpinner isBlack={true} />
                    ) : (
                        <IoMdHeart className='icon' style={ isFavorite ? { color: '#bb0505' } : {} } />
                    )}
                </span>
            </div>

            <figcaption className="product__details">
                <Link to={itemUrl}>
                    <span className="product__figure--name">
                        {((grid === 2 && width <= 400) || homeStyles) ? (
                            <>
                                {truncateString(item?.name, 15)}
                            </>
                        ) : (
                            <>{item?.name}</>
                        )}
                    </span>
                </Link>
                {item?.discountPercent ? (
                    <span className="product__figure--prices">
                        <p className="product__figure--main">₦{currencyConverter(discountedPrice)}</p>
                        <p className="product__figure--slashed">₦{currencyConverter(item?.price)}</p>
                    </span>

                ) : (
                    <span className="product__figure--prices">
                        <p className="product__figure--main" style={{ color: '#555' }}>₦{currencyConverter(item?.price)}</p>
                    </span>
                )}

                {(collectionStyles || homeStyles) && (
                    <div className="product__details--actions">
                    <button onClick={handleNavToProduct} className='link--btn'>
                        <TbEyeSearch className='icon' />
                        <>View Item</>
                    </button>
                    <button onClick={handleAddToWishlist}>
                        {(isLoadingMiniWish) && (
                            <MiniSpinner isBlack={true} />
                        )}
                        <HiGiftTop className="icon" />
                        Make Wish
                    </button>
                    <button onClick={handleAddToCart}>
                        {(isLoadingMiniCart) ? (
                            <MiniSpinner isBlack={true} />
                        ) : (
                            isCartItem ? (
                                <TbShoppingCartCheck className="icon" />
                            ) : (
                                <TbShoppingCart className="icon" />
                            )
                        )}
                    </button>
                </div>
                )}
            </figcaption>
        </figure>
    </>
  )
}

export default ItemCard
