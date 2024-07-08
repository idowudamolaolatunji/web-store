import React, { useState } from 'react';

import Header from '../../components/Header';
import FavoriteItem from './components/FavoriteItem';
import NoItem from '../../ui\'s/NoItem';

import Img from '../../assets/illustrations/3d-casual-life-open-blue-cardboard-box.png'
import { useFavoriteContext } from '../../contexts/favoriteContext';


function index() {
    const { favItems } = useFavoriteContext();
    return (
        <>
            <Header />

            <section className="section--more">
                <div className="container">
                    {(favItems && favItems?.length > 0) ? (
                        <>
                            <span className='section__heading--box'>
                                <h2 className="section--heading">Your Favorite</h2>
                                <span className='details'>{favItems?.length}</span>
                            </span>
                            <div className="items__grid">
                                {favItems.map(item => (
                                    <FavoriteItem item={item} />
                                ))}
                            </div>
                        </>

                    ) : (
                        <NoItem
                            img={Img}
                            title={'No Favorite Items'}
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
