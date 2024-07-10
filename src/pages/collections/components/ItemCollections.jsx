import React, { useEffect, useState } from 'react';

import ItemCard from '../../../components/ItemCard';
import { Link, useParams } from 'react-router-dom';
import { useDataContext } from '../../../contexts/DataContext';
import { IoOptions } from 'react-icons/io5';
import { BsSortDownAlt } from 'react-icons/bs';

import RangeSlider from '../../../ui\'s/RangeSlider';
import { SlArrowDown } from 'react-icons/sl';
import SizesBox from '../../../components/SizesBox';
import { ColorBoxLg } from '../../../components/ColorBox';

import AllProducts from '../../../assets/pngs/all-products.png'
import { FaCheck } from 'react-icons/fa';
import { useWindowSize } from 'react-use';
import Overlay from '../../../components/Overlay';
import { truncateString } from '../../../utils/helper';

const filterSortingOptions = ["On sales", "Alphabetic A - Z", "Alphabetic Z - A", "Best selling", "Featured", "Price, Lower first", "Price, Highest first", "New to old", "Recommended"];
const filterTypes = ["Women", "Men", "Kids"];


function ItemCollections() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isShowMobileFilter, setIsShowMobileFilter] = useState(false);
    const [isShowMobileSorter, setIsShowMobileSorter] = useState(false);
    const [gridCount, setGridCount] = useState(window.localStorage.getItem('grid-view'));
    const [isShowSorter, setIsShowSorter] = useState(false);

    const [selectedSortingOption, setSelectedSortingOption] = useState('Recommended');
    const [selectedAvailability, setSelectedAvailablity] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);

    const [showModal, setShowModal] = useState({
        available: false,
        category: false,
        colors: false,
        types: false,
        sizes: false,
        priceRange: false,
        sortBy: false
    });


    const min = 5000;
    const max = 50000;
    const { slug } = useParams();
    const { getRequest } = useDataContext();
    const { width } = useWindowSize();
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';
    const productInStock = products?.filter(product => product?.amountInStock > 0);
    const productOutOfStock = products?.filter(product => product?.amountInStock < 1);

    // get all the sizes and colors from the products
    const productDetails = products?.map(product => product?.details).flat();
    const filterSizes = [...new Set(productDetails?.map(el => el.size))];
    const filterColors = [...new Set(productDetails?.map(el => el.color))];


    function handleSelectColor(color) {
        if(selectedColor && selectedColor === color) {
            setSelectedColor(null);
        } else {
            setSelectedColor(color);
        }
    }
    
    function handleSelectSize(size) {
        if(selectedSize && selectedSize === size) {
            setSelectedSize(null);
        } else {
            setSelectedSize(size);
        }
    }

    function handleSorting(option) {
        setSelectedSortingOption(option);
        setIsShowSorter(false);
        setIsShowMobileSorter(false)
    }

    function handleSelectTypes(type) {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(currType => currType !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    }

    function handleCloseFilter() {
        setIsShowMobileFilter(false)
    }

    function handleCloseSorter() {
        setIsShowMobileSorter(false)
    }

    function handlePriceRange(min, max) {
        // console.log(min, max)
        // setSelectedPriceRange([min, max])
    }

    function updateShowModal(currState) {
        const updatedState = { ...showModal };
        Object.keys(updatedState).forEach((key) => {
            // i do not understand what happened here, but it works
            updatedState[key] = key === currState ? !showModal[key] : false
        });
        setShowModal(updatedState);
    };

    function handleSetAvailability(type) {
        // HANDLE SELECTED AVAILABILITY TYPE

        if (selectedAvailability === type) {
            setSelectedAvailablity('');
            return;
        }

        if (type === 'in-stock' && productInStock?.length > 0) {
            setSelectedAvailablity(type);
        } else if (type === 'out-of-stock' && productOutOfStock?.length > 0) {
            setSelectedAvailablity(type);
        } else {
            return;
        }
    }

    useEffect(function() {
        window.localStorage.setItem('grid-view', gridCount)
    }, [gridCount]);

    useEffect(function () {
        async function handleFetchProductsInCategory() {
            let data;
            if (slug === "all") {
                data = await getRequest('products/');
            } else {
                data = await getRequest('products/category/products', slug);
            }
            setProducts(data?.data?.products);
            setIsLoading(false);
        }

        // if(width > 450 && slug) handleFetchProductsInCategory();
        handleFetchProductsInCategory();
    }, [slug]);

    useEffect(function () {
        async function handleFetchCategories() {
            const data = await getRequest('products/category');
            setCategories(data?.data?.categories);
        }
        handleFetchCategories();
    }, []);

    useEffect(function () {
        if (width <= 450) {
            setGridCount(2)
        } else {
            setGridCount(4)
        }
    }, [width]);

    // useEffect(function() {
    //     setIsShowMobileFilter(false);
    // }, [slug]);

    return (
        <>
            <div className='container collections'>
                <div className="collection--filters main--desktop">
                    <div className='left--filters filters'>
                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('category')}>
                                <p>Collections</p>
                                <SlArrowDown className={`icon ${showModal.category ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.category) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        {/* <p>Product Collections</p> */}
                                        <ul className="filter--links">
                                            <li className={`filter--link ${slug === 'all' ? 'link--active' : ''}`}>
                                                <Link to={`/collections/all`}>
                                                    <img src={AllProducts} style={{ width: "2.2rem", height: "2.2rem", objectFit: "cover" }} alt="product collection" />
                                                    <p>{'All collections'}</p>
                                                </Link>
                                            </li>
                                            {categories.map((category) => (
                                                <li className={`filter--link ${slug === category?.slug ? 'link--active' : ''}`}>
                                                    <Link to={`/collections/${category?.slug}`}>
                                                        <img src={assetUrl + category?.categoryImage} alt={category?.categoryName + 'collection'} />
                                                        <p>{category?.categoryName}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </figure>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('available')}>
                                <p>Available Instock</p>
                                <SlArrowDown className={`icon ${showModal.available ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.available) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        <div className={`filter--selections ${productInStock?.length < 1 ? 'not-available item-unclikable' : ''}`} onClick={() => handleSetAvailability('in-stock')}>
                                            <span className={`filter--select ${selectedAvailability === 'in-stock' ? 'select--active' : ''}`}>&nbsp;</span>
                                            <label className="filter--label">In stock ({productInStock?.length})</label>
                                        </div>
                                        <div className={`filter--selections ${productOutOfStock?.length < 1 ? 'not-available item-unclikable' : ''}`} onClick={() => handleSetAvailability('out-of-stock')}>
                                            <span className={`filter--select ${selectedAvailability === 'out-of-stock' ? 'select--active' : ''}`}>&nbsp;</span>
                                            <label className="filter--label">Out of stock ({productOutOfStock?.length})</label>
                                        </div>
                                    </figure>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('priceRange')}>
                                <p>Price</p>
                                <SlArrowDown className={`icon ${showModal.priceRange ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.priceRange) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        <p>Price Range</p>
                                        <RangeSlider min={min} max={max} onChange={({ min, max }) => handlePriceRange(min, max)} />
                                    </figure>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('types')}>
                                <p>Type</p>
                                <SlArrowDown className={`icon ${showModal.types ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.types) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        {filterTypes?.map(type => (
                                            <div className="filter--check" onClick={() => handleSelectTypes(type)}>
                                                <span className={`filter--checkbox ${selectedTypes.includes(type) ? "selected" : ""}`}>
                                                    {selectedTypes.includes(type) && (
                                                        <FaCheck className='icon' />
                                                    )}
                                                </span>
                                                <p className='filter--label'>{type}</p>
                                            </div>
                                        ))}
                                    </figure>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('sizes')}>
                                <p>Sizes</p>
                                <SlArrowDown className={`icon ${showModal.sizes ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.sizes) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        <div className="filter--sizes">
                                            {filterSizes?.map(size => {
                                                return <SizesBox size={size} handleSelected={handleSelectSize} selected={selectedSize} />
                                            })}
                                        </div>
                                    </figure>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('colors')}>
                                <p>Colors</p>
                                <SlArrowDown className={`icon ${showModal.colors ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.colors) && (
                                <span className='filter--dropdown'>
                                    <figure>
                                        <div className="filter--colors">
                                            {filterColors?.map(color => (
                                                <span className='colors'>
                                                    <ColorBoxLg color={color} handleSelected={handleSelectColor} selected={selectedColor} />
                                                    <p>{color}</p>
                                                </span>
                                            ))}
                                        </div>
                                    </figure>
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="right--filters filters">
                        <div className="filter--grid-view">
                            <div className={gridCount === 2 ? 'active--view' : ''} onClick={() => setGridCount(2)}>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                            </div>
                            <div className={gridCount === 3 ? 'active--view' : ''} onClick={() => setGridCount(3)}>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                            </div>
                            <div className={gridCount === 4 ? 'active--view' : ''} onClick={() => setGridCount(4)}>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                                <span className='collection--view'>&nbsp;</span>
                            </div>
                        </div>

                        <div className="filter--controls"
                            style={{ position: 'relative', cursor: 'pointer', minWidth: '14rem' }}
                            onMouseEnter={() => setIsShowSorter(true)}
                            onMouseLeave={() => setIsShowSorter(false)}>
                            <p>{selectedSortingOption}</p>
                            <BsSortDownAlt className='icon' />


                            {isShowSorter && (
                                <ul className="sorter--dropdown">
                                    {filterSortingOptions.map((option, i) => (
                                        <li key={i} onClick={() => handleSorting(option)}>{option}</li>
                                    ))}

                                </ul>
                            )}
                        </div>
                    </div>
                </div>




                <div className="collection--filters main--mobile">
                    <span className='filter--controls' onClick={() => setIsShowMobileFilter(true)}>
                        <IoOptions className='icon' />
                        <p>filters</p>
                    </span>

                    <div className="filter--grid-view">
                        <div className={gridCount === 2 ? 'active--view' : ''} onClick={() => setGridCount(2)}>
                            <span className='collection--view'>&nbsp;</span>
                            <span className='collection--view'>&nbsp;</span>
                        </div>
                        <div className={`trans-rotate ${gridCount === 1 ? 'active--view' : ''}`} onClick={() => setGridCount(1)}>
                            <span className='collection--view'>&nbsp;</span>
                            <span className='collection--view'>&nbsp;</span>
                            <span className='collection--view'>&nbsp;</span>
                        </div>
                    </div>

                    <span className='filter--controls' onClick={() => setIsShowMobileSorter(true)}>
                        <BsSortDownAlt className='icon' />
                        <p>{truncateString(selectedSortingOption, 8)}</p>
                    </span>
                </div>


                {/* ITEM */}
                <div className="items__grid" style={{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }}>
                    {(!isLoading && products && products.length > 0) && products.map(product => (
                        <ItemCard item={product} key={product._id} grid={gridCount} isLoading={isLoading} />
                    ))}
                </div>
            </div>

            {isShowMobileFilter && (
                <>
                    <Overlay handleClose={handleCloseFilter} />
                    <div className="filter--mobile-sidebar">
                        <span className='flex-al-cen' style={{ gap: '2rem' }}>
                            <IoOptions className='icon' />
                            <p>filters</p>
                        </span>

                        {/* <span></span> */}

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('category')}>
                                <p>Collections</p>
                                <SlArrowDown className={`icon ${showModal.category ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.category) && (
                                <span className='filter--dropdown'>
                                    <ul className="filter--links">
                                        <li className={`filter--link ${slug === 'all' ? 'link--active' : ''}`}>
                                            <Link to={`/collections/all`}>
                                                <img src={AllProducts} style={{ width: "2.2rem", height: "2.2rem", objectFit: "cover" }} alt="product collection" />
                                                <p>{'All collections'}</p>
                                            </Link>
                                        </li>
                                        {categories.map((category) => (
                                            <li className={`filter--link ${slug === category?.slug ? 'link--active' : ''}`}>
                                                <Link to={`/collections/${category?.slug}`}>
                                                    <img src={assetUrl + category?.categoryImage} alt={category?.categoryName + 'collection'} />
                                                    <p>{category?.categoryName}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('available')}>
                                <p>Available Instock</p>
                                <SlArrowDown className={`icon ${showModal.available ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.available) && (
                                <span className='filter--dropdown'>
                                    <div className={`filter--selections ${productInStock?.length < 1 ? 'not-available item-unclikable' : ''}`} onClick={() => handleSetAvailability('in-stock')}>
                                        <span className={`filter--select ${selectedAvailability === 'in-stock' ? 'select--active' : ''}`}>&nbsp;</span>
                                        <label className="filter--label">In stock ({productInStock?.length})</label>
                                    </div>
                                    <div className={`filter--selections ${productOutOfStock?.length < 1 ? 'not-available item-unclikable' : ''}`} onClick={() => handleSetAvailability('out-of-stock')}>
                                        <span className={`filter--select ${selectedAvailability === 'out-of-stock' ? 'select--active' : ''}`}>&nbsp;</span>
                                        <label className="filter--label">Out of stock ({productOutOfStock?.length})</label>
                                    </div>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('priceRange')}>
                                <p>Price</p>
                                <SlArrowDown className={`icon ${showModal.priceRange ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.priceRange) && (
                                <span className='filter--dropdown'>
                                    <p>Price Range</p>
                                    <RangeSlider min={min} max={max} onChange={({ min, max }) => handlePriceRange(min, max)} />
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('types')}>
                                <p>Type</p>
                                <SlArrowDown className={`icon ${showModal.types ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.types) && (
                                <span className='filter--dropdown'>
                                    {filterTypes?.map(type => (
                                        <div className="filter--check" onClick={() => handleSelectTypes(type)}>
                                            <span className={`filter--checkbox ${selectedTypes.includes(type) ? "selected" : ""}`}>
                                                {selectedTypes.includes(type) && (
                                                    <FaCheck className='icon' />
                                                )}
                                            </span>
                                            <p className='filter--label'>{type}</p>
                                        </div>
                                    ))}
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('sizes')}>
                                <p>Sizes</p>
                                <SlArrowDown className={`icon ${showModal.sizes ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.sizes) && (
                                <span className='filter--dropdown'>
                                    <div className="filter--sizes">
                                        {filterSizes?.map(size => {
                                            return <SizesBox size={size} handleSelected={handleSelectSize} selected={selectedSize} />
                                        })}
                                    </div>
                                </span>
                            )}
                        </span>

                        <span className="filter--tabs">
                            <div className="tabs--heading" onClick={() => updateShowModal('colors')}>
                                <p>Colors</p>
                                <SlArrowDown className={`icon ${showModal.colors ? 'icon--active' : ''}`} />
                            </div>

                            {(showModal.colors) && (
                                <span className='filter--dropdown'>
                                    <div className="filter--colors">
                                        {filterColors?.map(color => (
                                            <span className='colors'>
                                                <ColorBoxLg color={color} handleSelected={handleSelectColor} selected={selectedColor} />
                                                <p>{color}</p>
                                            </span>
                                        ))}
                                    </div>
                                </span>
                            )}
                        </span>

                        {console.log(selectedAvailability, selectedColor, selectedSize, selectedTypes?.length > 0, selectedPriceRange?.length > 0)}

                        {(selectedAvailability || selectedColor || selectedSize || selectedTypes?.length > 0 || selectedPriceRange?.length > 0) && (
                            <button type="button" className='filter--btn'>Apply</button>
                        )}
                    </div>
                </>
            )}

            {isShowMobileSorter && (
                <>
                    <Overlay handleClose={handleCloseSorter} />
                    <ul className="sorter--mobile-sidebar">
                        {filterSortingOptions.map((option, i) => (
                            <li key={i} className={option === selectedSortingOption ? 'selected' : ''} onClick={() => handleSorting(option)}>{option}</li>
                        ))}
                    </ul>
                </>
            )}

        </>
    )
}

export default ItemCollections
