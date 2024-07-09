import React, { useState } from 'react';

import Header from '../../components/Header';
import FavoriteItem from './components/FavoriteItem';
import NoItem from '../../ui\'s/NoItem';

import Img from '../../assets/illustrations/3d-casual-life-open-blue-cardboard-box.png'
import { useFavoriteContext } from '../../contexts/favoriteContext';
import { useWindowSize } from 'react-use';
import { useCartContext } from '../../contexts/cartContext';
import MiniSpinner from '../../ui\'s/Spinner/MiniSpinner';


function index() {
    const [isLoadingMini, setIsLoadingMini] = useState(false);

    const { favItems, onClearList } = useFavoriteContext();
    const { width } = useWindowSize();

    function handleClearFavorite() {
        setIsLoadingMini(true);

        setTimeout(() => {
            setIsLoadingMini(false);
            onClearList();
        }, 1000);
    }

    return (
        <>
            <Header />

            <section className="section">
                <div className="container">
                    {(favItems && favItems?.length > 0) ? (
                        <>
                            <span className='section__heading--box'>
                                <h2 className="section--heading">Your Favorite</h2>
                                <span className='details'>{favItems?.length}</span>
                            </span>
                            <div className="favorite__grid items__grid">
                                {favItems.map(item => (
                                    <FavoriteItem item={item} />
                                ))}
                            </div>

                            {width <= 450 && (
                                <button className='fav__btn' onClick={handleClearFavorite}>
                                    {isLoadingMini ? (
                                        <MiniSpinner />
                                    ) : (
                                        <>Clear List</>
                                    )}
                                </button>
                            )}
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
