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
import { HiGiftTop } from 'react-icons/hi2';
import { TbShoppingCart, TbShoppingCartCheck } from 'react-icons/tb'

import { ShareSocial } from 'react-share-social';
import Overlay from '../../../components/Overlay'

const shareCustomStyle = {
	root: {
        width: '32rem',
        position: 'absolute',
        padding: '1.4rem 2rem',
        borderRadius: '.4rem',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1500',
	},
	copyContainer: {
		fontWeight: 500,
		fontSize: '1.4rem',
		padding: '1rem',
	},
}

function FavoriteItem({ item }) {
    const [isLoadingMini, setIsLoadingMini] = useState(false);
    const [isLoadingMiniCart, setIsLoadingMiniCart] = useState(false);
    const [isCartItem, setIsCartItem] = useState(false);
    const [share, setShare] = useState(false)

    const navigate = useNavigate();
    const { onToggleFavorite } = useFavoriteContext();
    const { cartItems, onAdd } = useCartContext();

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
        if(isCartItem) return;
        setIsLoadingMiniCart(true);

        setTimeout(() => {
            setIsLoadingMiniCart(false);
            onAdd(product, 1)
        }, 1000);
    }

    useEffect(function() {
        const alreadyInCart = cartItems?.find(cartItem => cartItem?._id === item?._id);
        if(alreadyInCart) {
            setIsCartItem(true)
        }
    }, [cartItems]);
    


    return (
        <>
            <figure className="product__figure favorite--figure main--desktop">
                <div className="product__figure--img-box">
                    <img src={assetUrl + item?.images[0]} alt={item?.name} className="product__figure--img" />

                    {(item?.discountPercent && item?.discountPercent > 0) ? (
                        <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                    ) : (<></>)}

                    <span className="heart--icon" onClick={handleAddToFavorite}>
                        {isLoadingMini ? (
                            <MiniSpinner isBlack={true} />
                        ) : (
                            <IoMdHeart className='icon' color='#bb0505' />
                        )}
                    </span>
                </div>
                <figcaption className="product__details">
                    <Link to={itemUrl}>
                        <span className="product__figure--name">{truncateString(item?.name, 28)}</span>
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
                    <div className="product__figure--action">
                        <button onClick={handleAddToCart} style={{ gap: '1rem'}} className={isCartItem ? 'is--added' : ''}>
                            {(isCartItem && !isLoadingMiniCart) ? (
                                <>
                                    <TbShoppingCartCheck className="icon" />
                                    Added to cart
                                </>
                            ): (!isCartItem && !isLoadingMiniCart) ? (
                                <>
                                    <TbShoppingCart className="icon" />
                                    Add to cart
                                </>
                            ) : (
                                <MiniSpinner />
                            )}
                        </button>
                    </div>
                </figcaption>
            </figure>


            <figure className="product__figure favorite--figure main--mobile">
                <div className="product__figure--img-box">
                    <Link to={itemUrl}>
                        <img src={assetUrl + item?.images[0]} onClick={handleNagivateToItem} alt={item?.name} className="product__figure--img" />
                    </Link>
                    {(item?.discountPercent && item?.discountPercent > 0) ? (
                        <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                    ) : (<></>)}
                </div>

                <figcaption className="product__details">
                    <Link to={itemUrl}>
                        <span className="product__figure--name">{item?.name}</span>
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
                        <span className="heart--icon" onClick={() => setShare(true)}>
                            <IoIosShareAlt className="icon" />
                        </span>
                    </div>
                </figcaption>
            </figure>


            {share && (
                <>
                <Overlay handleClose={() => setShare(false)} />
                <ShareSocial 
                    url={`localhost:5173${itemUrl}`}
                    socialTypes= {['facebook','twitter', 'whatsapp', 'telegram', 'linkedin']}
                    style={shareCustomStyle}
                    onSocialButtonClicked={ (data) => console.log(data)}  
                />
                </>
            )}

        </>
    )
}

export default FavoriteItem
