import React, { useEffect, useState } from 'react';

import ReactImageMagnify from 'react-image-magnify';
import { IoStar } from 'react-icons/io5';
import { ColorBoxLg } from '../../../components/ColorBox';
import SizesBox from '../../../components/SizesBox';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GiFairyWand } from 'react-icons/gi';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { numberConverter, truncateString } from '../../../utils/helper';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCartContext } from '../../../contexts/cartContext';
import { LuCheckCircle, LuStore } from 'react-icons/lu';
import { MdOutlineInventory } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useFavoriteContext } from '../../../contexts/favoriteContext';

import MiniSpinner from '../../../ui\'s/Spinner/MiniSpinner'


function ProductItem({ product }) {
    const [truncate, setTruncate] = useState(true);
    const [currIndex, setCurrIndex] = useState(0);

    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('l');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [quantityBasedOnColorAndSizeInStock, setQuantityBasedOnColorAndSizeInStock] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    //////////////////////////////////////////////////////////
    const [isLoadingMini, setIsLoadingMini] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const { onAdd } = useCartContext();
    const { onToggleFavorite, favItems } = useFavoriteContext();

    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const discountAmount = (product?.discountPercent / 100) * product?.price;
    const discountedPrice = product?.discountPercent ? (product?.price - discountAmount) : product?.price;

    const shownImage = assetUrl + product?.images[currIndex]
    const productDetails = product?.details;
    const colors = [...new Set(productDetails?.map(el => el.color))];
    const sizes = [...new Set(productDetails?.map(el => el.size))];

    const totalQuantitesInStock = productDetails?.reduce((acc, el) => acc + el.quantity, 0);
    console.log(totalQuantitesInStock, quantityBasedOnColorAndSizeInStock);

    const selectedProduct = { ...product, selectedColor, selectedSize, selectedQuantity, discountedPrice }
    console.log(selectedProduct)

    function handleChangeIndex(i) {
        setCurrIndex(i)
    }

    let sizeLabeled;
    if(selectedSize === 'l') {
        sizeLabeled = 'Large sized'
    } else if(selectedSize === 'm') {
        sizeLabeled = 'Meduim sized'
    } else if(selectedSize === 's') {
        sizeLabeled = 'Small sized'
    } else if(selectedSize === 'xl') {
        sizeLabeled = 'Extra large sized'
    } else {
        sizeLabeled = 'X Extra large sized'
    }

    const imagesIndexLength = product?.images?.length - 1;
    function handleNextSlide() {
        if (currIndex < imagesIndexLength) {
            setCurrIndex(currIndex + 1)
        } else {
            setCurrIndex(0)
        }
        setSlideDirection('right');
        setTimeout(() => {
            setSlideDirection(null)
        }, 200);
    }
    function handlePrevSlide() {
        if (currIndex > 0) {
            setCurrIndex(currIndex - 1)
        } else {
            setCurrIndex(imagesIndexLength)
        }
        setSlideDirection('left');
        setTimeout(() => {
            setSlideDirection(null)
        }, 200);
    }

    function handleIncreaseQuantity() {
        if (selectedQuantity < maxQuantity) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    }

    function handleDecreaseQuantity() {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    }

    function handleSelectColor(color) {
        setSelectedColor(color)
    }
    function handleSelectSize(size) {
        setSelectedSize(size)
    }

    function handleAddToCart() {
        onAdd(selectedProduct, selectedQuantity)
    }

    function handleAddToFavorite() {
        setIsLoadingMini(true);
        onToggleFavorite(selectedProduct);
        
        setTimeout(() => {
            setIsLoadingMini(false);
            setIsFavorite(true);
        }, 1000);
    }

    useEffect(function() {
        const itemInFavContext = favItems?.find(item => item?._id === selectedProduct?._id);
        if(itemInFavContext) setIsFavorite(true);
        else setIsFavorite(false);
    }, [isFavorite, isLoadingMini]);


    useEffect(function () {
        if (product) document.title = `${product?.name} - LuxeWares Ng`
        window.scrollTo(0, 0);

        setSelectedColor('black');
        setSelectedSize('l');
    }, []);


    useEffect(function () {
        const filterDetails = productDetails.find(el => el.color === selectedColor && el.size === selectedSize);

        if (filterDetails) {
            setQuantityBasedOnColorAndSizeInStock(filterDetails?.quantity)
            setMaxQuantity(filterDetails?.quantity);
        } else {
            setQuantityBasedOnColorAndSizeInStock(null)
            setMaxQuantity(0);
        }

        setSelectedQuantity(1)
    }, [selectedColor, selectedSize])


    return (
        <section className='section'>
            <div className="container">
                <div className="product--container">
                    <div className="product__image--box">
                        <div className="product__image--sub-images">
                            {product?.images?.map((image, i) => {
                                return <img src={assetUrl + image} alt={image + i} className={`product--sub-image ${currIndex === i ? 'active-img' : ''}`} onClick={() => handleChangeIndex(i)} onMouseEnter={() => handleChangeIndex(i)} />
                            })}
                        </div>

                        <div className="product__image--main main--desktop">
                            <button className='product-slider-btn left--btn' onClick={handlePrevSlide}><IoIosArrowBack className='icon' /></button>
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: shownImage,
                                    },
                                    largeImage: {
                                        src: shownImage,
                                        width: 1200,
                                        height: 1800
                                    }
                                }}
                                className='product--magnifier'
                                imageClassName='product--image'
                                enlargedImageContainerClassName="product--magified-box"
                            />
                            <button className='product-slider-btn right--btn' onClick={handleNextSlide}><IoIosArrowForward className='icon' /></button>
                        </div>

                        <div className="product__image--main main--mobile">
                            <p className='product--nav'>
                                <Link to={'/'}>home</Link>{' > '}
                                <Link to={'/collections/all'}>product</Link>{' > '}
                                <Link to={`/collections/${product?.category}`}>{product?.category}</Link>
                            </p>
                            <button className='product-slider-btn left--btn' onClick={handlePrevSlide}><IoIosArrowBack className='icon' /></button>
                            <img src={shownImage} className='product--image' style={ slideDirection === 'right' ? { animation: 'img-slide-in-right'} : slideDirection ? { animation: 'img-slide-in-left' } : {}} alt={product?.name} />
                            <button className='product-slider-btn right--btn' onClick={handleNextSlide}><IoIosArrowForward className='icon' /></button>
                        </div>

                    </div>
                    <div className="product__text--box">
                        <p className='product--nav'>product / {product?.category}</p>
                        <h3 className="product--name">{product?.name}</h3>
                        <div className='product--prices'>
                            <span className='product--price-des'>₦{numberConverter(product?.price)}</span>
                            <span className="product--price-main">₦{numberConverter(discountedPrice)}</span>
                            <span className='product--discount-percent'>{product?.discountPercent}% <p>discount</p></span>
                        </div>

                        {/* 
                        <div className='product--ratings'>
                            <span className="product--stars">
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStar />
                            </span>
                            <p>(4.9) 1.2k Rating</p>
                        </div>
                        */}

                        <span className="product--description">
                            <h4>Description</h4>
                            <p>
                                {truncate ? truncateString(product?.description, 100) : product?.description}
                                <span style={{ color: '#01afa6', cursor: 'pointer' }} onClick={() => setTruncate(!truncate)}>{truncate ? 'show more' : ' show less'}</span>
                            </p>
                        </span>

                        <div className="product--sales-info">
                            <p><LuCheckCircle className='icon shaky' color='#01afa6' /> 39 people are viewing this {product?.category} currently</p>
                        </div>

                        <div className="product--util">
                            <span>Available Color</span>
                            <div>{colors?.map(color => <ColorBoxLg color={color} handleSelected={handleSelectColor} selected={selectedColor} />)}</div>
                        </div>

                        <p className='product--stock-info' style={{ marginBottom: '.4rem', color: '#01afa6' }}><MdOutlineInventory className='icon'/>{quantityBasedOnColorAndSizeInStock || 'No'} ({sizeLabeled}) {selectedColor} color of this {product?.category} in stock</p>


                        <div className="product--util">
                            <span>Available Size</span>
                            <div>{sizes?.map(size => <SizesBox size={size} handleSelected={handleSelectSize} selected={selectedSize} />)}</div>
                        </div>

                        <div className="product--actions product--actions-one">
                            <div className={`product--quantity ${maxQuantity === 0 ? 'item-unclikable' : ''}`}>
                                <button onClick={handleDecreaseQuantity}><HiMinus className='icon' /></button>
                                <p>{selectedQuantity}</p>
                                <button onClick={handleIncreaseQuantity}><HiPlus className='icon' /></button>
                            </div>

                            <div className={`${maxQuantity === 0 ? 'item-unclikable' : ''}`}>
                                <button className='btn cart--action-btn' onClick={handleAddToCart}>Add to Cart</button>
                            </div>

                            <button className='btn util--action-btn' onClick={handleAddToFavorite}>
                                {isLoadingMini && (
                                    <MiniSpinner />
                                )}

                                {(!isLoadingMini && isFavorite) && (
                                    <AiFillHeart className='icon' />
                                )}
                                
                                {(!isLoadingMini && !isFavorite) && (
                                    <AiOutlineHeart className='icon' />
                                )}
                            </button>
                        </div>

                        {/* <div className="product--actions product--actions-two">
                            <button className='btn util--action-btn'>
                                <GiFairyWand className='icon' />
                            </button>

                            <div className={`${maxQuantity === 0 ? 'item-unclikable' : ''}`}>
                                <button className='btn checkout--action-btn'>Buy now</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductItem
