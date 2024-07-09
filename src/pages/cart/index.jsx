import React from 'react';
import { useCartContext } from '../../contexts/cartContext';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartBox from './components/CartBox';
import CartSummary from './components/CartSummary';
import NoItem from '../../ui\'s/NoItem';
import './style.css';


import Img from '../../assets/illustrations/casual-life-3d-side-view-of-shopping-cart-1.png'

function index() {
    const { cartItems } = useCartContext();
    
    return (
        <>
            <Header />

            <section className="section">
                <div className="container">
                    {cartItems?.length > 0 ? (
                        <div className='cart--container'>
                            <div>
                                <span className='section__heading--box'>
                                    <h2 className="section--heading">Your Cart</h2>
                                    <span className='details'>{cartItems?.length}</span>
                                </span>

                                <CartBox />
                            </div>
                            <CartSummary />
                        </div>
                    ) : (
                        <NoItem
                            margin={'3rem'}
                            img={Img}
                            title={'Your cart is empty'}
                            linkAddress={'/collections/all'}
                            linkText={'Continue Shopping'}
                        />
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}

export default index
