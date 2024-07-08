import React, { useState } from 'react'
import { currencyConverter, truncateString } from '../../../utils/helper';

import { IoMdHeart } from 'react-icons/io';
import { IoCartOutline, IoGiftOutline } from 'react-icons/io5';

import '../../../components/ItemCard/item.css'
import { useFavoriteContext } from '../../../contexts/favoriteContext';
import MiniSpinner from '../../../ui\'s/Spinner/MiniSpinner';
import { useNavigate } from 'react-router-dom';


function FavoriteItem({ item }) {
    const [figureIsHovered, setFigureIsHovered] = useState(false);

    ////////////////////////////////////////////////////////
    const [isLoadingMini, setIsLoadingMini] = useState(false);
    const { onToggleFavorite } = useFavoriteContext();
    const navigate = useNavigate();

    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (item?.discountPercent / 100) * item?.price;
    const discountedPrice = item?.discountPercent ? (item?.price - discountAmount) : item?.price;

    function handleAddToFavorite() {
        setIsLoadingMini(true);
        
        setTimeout(() => {
            setIsLoadingMini(false);
            onToggleFavorite(item);
        }, 1000);
    }

    function handleNagivateToItem() {
        navigate(`/product/${item?.slug}`)
    }


    return (
        <figure className="product__figure">
            <div className="product__figure--img-box" onMouseEnter={() => setFigureIsHovered(true)} onMouseLeave={() => setFigureIsHovered(false)}>
                <img src={!figureIsHovered ? `${assetUrl + item?.images[0]}` : `${assetUrl + item?.images[1]}`} onClick={handleNagivateToItem} alt={item?.name} className="product__figure--img" />

                {(item?.discountPercent && item?.discountPercent !== 0) && (
                    <span className="product--discount">-{item?.discountPercent}<p>%</p></span>
                )}

                <span className="heart--icon" onClick={handleAddToFavorite}>
                    {isLoadingMini ? (
                        <MiniSpinner isBlack={true} />
                    ) : (
                        <IoMdHeart className='icon' color='red' />
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
    )
}

export default FavoriteItem
