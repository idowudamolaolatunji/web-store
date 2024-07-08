import React, { useEffect, useState } from 'react';

import CartFigure from './CartFigure';
import CartPolicy from './CartPolicy';
import { useCartContext } from '../../../contexts/cartContext';

function CartBox() {
    const { cartItems } = useCartContext();

    return (
        <>
            <div className='cart--box'>
                {cartItems?.map((item) => {
                    return <CartFigure item={item} />
                })}
            </div>

            {(cartItems?.length < 3) && (
                <div style={{ marginTop: '5.2rem' }} className='display-none'>
                    <CartPolicy />
                </div>
            )}
        </>
    )
}

export default CartBox;