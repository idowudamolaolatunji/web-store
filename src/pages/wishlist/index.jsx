import React from 'react';

import Header from '../../components/Header';
import NoItem from '../../ui\'s/NoItem';
import Img from '../../assets/illustrations/3d-casual-life-gift-box-with-streamers.png'
import { useWishesContext } from '../../contexts/WishesContext';
import WishItem from './components/WishItem';
import './style.css';


function index() {
    const { wishItems } = useWishesContext();
    

    return (
        <>
            <Header />

            <section className="section--more">
                <div className="container">
                    {(wishItems && wishItems?.length > 0) ? (
                        <>
                            <span className='section__heading--box'>
                                <h2 className="section--heading">Your Wishes</h2>
                                <span className='details'>{wishItems?.length}</span>
                            </span>
                            <h3 className="section--heading"></h3>
                            <div className="wish__grid">
                                {wishItems?.prototype?.map(wish => (
                                    <WishItem key={wish?._id} item={wish} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <NoItem
                            img={Img}
                            title={'Your wishlist is empty'}
                            linkAddress={'/collections/all'}
                            linkText={'Check Products'}
                        />
                    )}
                </div>
            </section>
        </>
    )
}

export default index
