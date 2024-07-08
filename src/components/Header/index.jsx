import React, { useEffect, useState } from 'react';
import { useDataContext } from '../../contexts/DataContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CollapsibleSpan from 'react-collapsible';

// import Logo from '../../assets/logos/test-logo.png';
import Logo from '../../assets/logos/alloura-removebg-preview.png';
import User from '../../assets/pngs/template-user.jpg';
import { SlArrowDown } from 'react-icons/sl';
import { GiFairyWand } from 'react-icons/gi';
import { IoCartOutline, IoGiftOutline, IoHeartOutline, IoLocationOutline, IoLogInOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';

import './style.css';
import { IoMdHeartEmpty } from 'react-icons/io';
import SearchSidebar from '../SearchSidebar';
import { useCartContext } from '../../contexts/cartContext';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { CiMenuFries } from 'react-icons/ci';
import { TfiClose, TfiGift } from 'react-icons/tfi';
import Overlay from '../Overlay';
import { useFavoriteContext } from '../../contexts/favoriteContext';
import { useWishesContext } from '../../contexts/WishesContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { createPortal } from 'react-dom';


function index() {
    const [sticky, setSticky] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [visibleUserDropdown, setVisibleUserDropdown] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const { user, token } = useAuthContext();
    const { getRequest } = useDataContext();
    const { cartItems } = useCartContext();
    const { favItems } = useFavoriteContext();
    const { wishItems } = useWishesContext();
    const navigate = useNavigate();
    const assetUrl = import.meta.env.VITE_SERVER_ASSET_URL + '/products/';

    // const token = 'dnxjdncjdjn3jn4jrnj4f';
    // const user = {
    //     firstName: 'Idowu',
    //     image: null
    // }

    function handleNavigateUSer() {
        if (user && token) {
            navigate('/dashboard');
        } else {
            navigate('/login')
        }
    }

    function handleMobileSidebar() {
        setShowMobileSidebar(!showMobileSidebar);
    }

    function handleShowSearchModal() {
        setShowSearchModal(true)
    }

    function handleDropdown() {
        setShowDropdown(!showDropdown)
    }

    useEffect(function() {
        setShowMobileSidebar(false)
    }, []);

    useEffect(function () {
        function controlNavbar() {
            if (window.scrollY >= 200) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener('scroll', controlNavbar)
        controlNavbar();

        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, []);

    useState(function () {
        async function handleFetchProductCategories() {
            const data = await getRequest('products/category');
            setCategories(data.data.categories);
        }

        handleFetchProductCategories()
    }, []);


    return (
        <>

            <header className="header main--desktop" style={sticky ? { position: "sticky", animationName: 'slide-in-from-up', borderBottom: '1.4px solid transparent' } : { position: "static", animation: 'none', borderBottom: '1.4px solid #f1f1f1' }}>


                <nav className="header__nav">
                    <div className="header__logo">
                        <Link to={'/'}>
                            <img src={Logo} className="logo_img" alt="" />
                        </Link>
                    </div>
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/" className="nav__link">Home</Link>
                        </li>
                        <li className="nav__item" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                            <Link to="/collections/all" className="nav__link">Store</Link>
                            <SlArrowDown className="nav_icon" />

                            {(showDropdown && categories) && (
                                <ul className='dropdown__card'>
                                    {categories.map((category) => (
                                        <li className='dropdown__item'>
                                            <Link to={`/collections/${category?.slug}`}>
                                                <img src={assetUrl + category?.categoryImage} alt={category?.categoryName} />
                                                <p>{category?.categoryName}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className="nav__item">
                            <Link to="/blogs" className="nav__link">Blogs</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/contact" className="nav__link">Contact</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/faq" className="nav__link">Faq</Link>
                        </li>
                    </ul>
                </nav>
                

                <div className="header__actions">
                    <div className="header__icon" onClick={handleShowSearchModal}>
                        <IoSearchOutline className="icon__el" />
                    </div>
                    <span className="header__icon" style={{ position: 'relative' }} onMouseEnter={() => setVisibleUserDropdown(true)} onMouseLeave={() => setVisibleUserDropdown(false)}>
                        {(user && token) ? (
                            user?.image ? (
                                <img src={user?.image} alt="" className="header__userImg" />
                            ) : (
                                <span className="userImg--initials">
                                    {user?.firstName?.charAt(0)}
                                </span>
                            )
                        ) : (
                            <IoPersonOutline className="icon__el" />
                        )}

                        {visibleUserDropdown && (
                            <ul className='dropdown__card' style={{ top: '3.8rem' }}>
                                <button onClick={handleNavigateUSer} className='dropdown__user-btn'>
                                    {(user && token) ? (
                                        <>
                                            <IoPersonOutline className='icon' />
                                            My Account
                                        </>
                                    ) : (
                                        <>
                                            <IoLogInOutline className='icon' />
                                            Sign In
                                        </>
                                    )}
                                </button>

                                <Link to={'/tracking-order'} className='dropdown__tracking-btn'>
                                    <IoLocationOutline className='icon' />
                                    Order Tracking
                                </Link>
                            </ul>
                        )}
                    </span>
                    <span className="header__icon" onClick={() => navigate('/favorite-items')}>
                        <IoMdHeartEmpty className="icon__el" />
                        <p className="icon--detail">{favItems?.length}</p>
                    </span>
                    <span className="header__icon" onClick={() => navigate('/wish-items')}>
                        <TfiGift className="icon__el" />
                        <p className="icon--detail">{wishItems?.length}</p>
                    </span>
                    <span className="header__icon" onClick={() => navigate('/cart')}>
                        <AiOutlineShoppingCart className="icon__el" />
                        <p className="icon--detail">{cartItems?.length}</p>
                    </span>
                </div>


                {showSearchModal && (
                    <SearchSidebar setShow={setShowSearchModal} />
                )}
            </header>


            <header className="header main--mobile" style={sticky ? { position: "sticky", animationName: 'slide-in-from-up', borderBottom: '1.4px solid transparent' } : { position: "static", animation: 'none', borderBottom: '1.4px solid #f1f1f1' }}>
                <div className="flex-al-cen" style={{ gap: '1.2rem' }}>
                    <span onClick={handleMobileSidebar}>
                        <CiMenuFries className='header--menu-icon' />
                    </span>
                    <span onClick={handleShowSearchModal}>
                        <IoSearchOutline className="icon__el" />
                    </span>
                </div>

                <div className="header__logo">
                    <Link to={'/'}>
                        <img src={Logo} className="logo_img" alt="" />
                    </Link>
                </div>


                <div className="header__actions">
                    <span className="header__icon" onClick={handleNavigateUSer}>
                        {(user && token) ? (
                            user?.image ? (
                                <img src={user?.image} alt="" className="header__userImg" />
                            ) : (
                                <span className="userImg--initials">
                                    {user?.firstName?.charAt(0)}
                                </span>
                            )
                        ) : (
                            <IoPersonOutline className="icon__el" />
                        )}
                    </span>
                    <span className="header__icon" onClick={() => navigate('/favorite-items')}>
                        <IoMdHeartEmpty className="icon__el" />
                        <p className="icon--detail">{favItems?.length}</p>
                    </span>
                    <span className="header__icon" onClick={() => navigate('/cart')}>
                        <IoCartOutline className="icon__el" />
                        <p className="icon--detail">{cartItems?.length}</p>
                    </span>
                </div>

                {createPortal(
                    showMobileSidebar && (
                        <>
                            <Overlay handleClose={handleMobileSidebar} />
                            <menu className='mobile--sidebar'>
                                <div className="sidebar--head">
                                    <div className="header__logo">
                                        <img src={Logo} className="logo_img" alt="" />
                                    </div>
    
                                    <span className='mobile-close' onClick={handleMobileSidebar}>
                                        <TfiClose className='header--menu-icon' />
                                    </span>
                                </div>
    
                                <div className="sidebar--body">
                                    <ul className="nav__list">
                                        <li className="nav__item">
                                            <Link to="/" className="nav__link">Home</Link>
                                        </li>
    
                                        <li className="nav__item">
                                            <Link to="/collections/all" className="nav__link">Store</Link>
                                            <SlArrowDown onClick={handleDropdown} className={`nav_icon ${showDropdown ? 'icon-roll' : ''}`} />
                                        </li>
                                        {showDropdown && (
                                            <span className="mobile-drop">
                                                {categories.map((category) => (
                                                    <li className='nav__item mobile-nav-item'>
                                                        <Link to={`/collections/${category?.slug}`}>
                                                            <img src={assetUrl + category?.categoryImage} alt={category?.categoryName} />
                                                            <p>{category?.categoryName}</p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </span>
                                        )}
    
    
                                        <li className="nav__item">
                                            <Link to="/blogs" className="nav__link">Blogs</Link>
                                        </li>
                                        <li className="nav__item">
                                            <Link to="/contact" className="nav__link">Contact</Link>
                                        </li>
                                        <li className="nav__item">
                                            <Link to="/faq" className="nav__link">Faq</Link>
                                        </li>
                                    </ul>
                                </div>
                            </menu>
                        </>
                    ), document.body
                )}

                {createPortal(
                    showSearchModal && (
                        <SearchSidebar setShow={setShowSearchModal} />
                    ), document.body
                )}
            </header>
        </>
    )
}


export default index;