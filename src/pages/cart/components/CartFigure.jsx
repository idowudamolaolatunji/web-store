import React, { useState } from 'react';

import { ColorBoxSm } from '../../../components/ColorBox';
import ConfirmationModal from '../../../ui\'s/modals/ConfirmationModal';
import Overlay from '../../../components/Overlay';
import { AiOutlineEdit } from 'react-icons/ai';
import { useCartContext } from '../../../contexts/cartContext';
import { numberConverter, truncateString } from '../../../utils/helper';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';


function cartFigure({ item }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();
    const { incQty, decQty, onRemove } = useCartContext();

    const url = `/product/${item?.slug}`;
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (item?.discountPercent / 100) * item?.price;
    const discountedPrice = item?.discountPercent ? (item?.price - discountAmount) : item?.price;


    function handleShowModal() {
        setShowDeleteModal(true)
    }

    function handleCloseModal() {
        setShowDeleteModal(false)
    }

    function handleRemoveItem() {
        onRemove(item)
    }

    function handleNagivateToItem() {
        navigate(url)
    }

    return (
        <>
            <figure className='cart--figure main--desktop'>
                <img src={assetUrl + item?.images[0]} alt={item?.name} className="cart--figure-product-img" onClick={handleNagivateToItem} />
                <div className="cart--figure-details">
                    <div className='figure--info'>
                        <span>
                            <Link to={url}><h3 className='cart--figure-heading'>{item?.name}</h3></Link>
                            <p className='cart--figure-des'>Color: {item?.selectedColor} <ColorBoxSm color={item?.selectedColor} /></p>
                            <p className='cart--figure-des'>Size: {item?.selectedSize}</p>
                        </span>

                        <div className='flex-al-cen' style={{ gap: '1rem' }}>
                            <div className='cart--quantity'>
                                <button onClick={decQty}><HiMinus className='icon' /></button>
                                <p>{item?.selectedQuantity}</p>
                                <button onClick={incQty}><HiPlus className='icon' /></button>
                            </div>
                            <span className="icon__box">
                                <AiOutlineEdit className='icon' color='#777' size={'1.8rem'} />
                            </span>
                        </div>
                    </div>

                    <div className='figure--info'>
                        <button className='cart--figure-del-btn' onClick={handleShowModal}>Delete</button>
                        <div className='flex-al-cen' style={{ gap: '.4rem' }}>
                            <span className='cart--quantity-x'>x</span>
                            <span className='cart--figure-price'>
                                ₦{numberConverter(discountedPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </figure>


            <figure className="cart--figure main--mobile">
                <img src={assetUrl + item?.images[0]} alt={item?.name} onClick={handleNagivateToItem} className="cart--figure-product-img" />

                <div className="cart--figure-details">
                    <span className='mobile--figure-info'>
                        <Link to={`/product/${item?.slug}`}><h3 className='cart--figure-heading'>{truncateString(item?.name, 34)}</h3></Link>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <span>
                                <p className='cart--figure-des'>Color: {item?.selectedColor} <ColorBoxSm color={item?.selectedColor} /></p>
                                <p className='cart--figure-des'>Size: {item?.selectedSize}</p>
                            </span>

                            <span className='cart--figure-price'>
                                ₦{numberConverter(discountedPrice)}
                            </span>
                        </div>
                        <div className='flex-al-cen' style={{ gap: '2rem' }}>
                            <div className='cart--quantity'>
                                <button onClick={decQty}><HiMinus className='icon' /></button>
                                <p>{item?.selectedQuantity}</p>
                                <button onClick={incQty}><HiPlus className='icon' /></button>
                            </div>
                            <span className="icon__box">
                                <AiOutlineEdit className='icon' color='#777' size={'1.8rem'} />
                            </span>

                            <button className='cart--figure-del-btn' onClick={handleShowModal}>Remove</button>
                        </div>
                    </span>
                </div>

            </figure>



            {showDeleteModal && (
                <>
                    <Overlay handleClose={handleCloseModal} />
                    <ConfirmationModal title={'Deletion of Cart Item'} handleClose={handleCloseModal}>
                        <p className='modal--text'>Are you sure you want to <span className="modal--text-special">delete</span> this cart item? If <span className="modal--text-special">yes</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, veritatis.</p>
                        <div className="modal--actions">
                            <button className='modal--btn modal--btn-no' onClick={handleCloseModal}>No</button>
                            <button className='modal--btn modal--btn-yes' onClick={handleRemoveItem}>Yes</button>
                        </div>
                    </ConfirmationModal>
                </>
            )}

        </>
    )
}

export default cartFigure;
