import React from 'react';
import { BsArrowReturnLeft, BsKey, BsTruck } from 'react-icons/bs';

function CartPolicy() {
    return (
        <span className='summary--policy'>
            <p>
                <BsKey className='icon' />
                Safe Order and deliver from Luxewares.
            </p>
            <p>
                <BsTruck className='icon' />
                Free delivery for orders over ₦100,000.
            </p>
            <p>
                <BsArrowReturnLeft className='icon' />
                7days for return of orders.
            </p>

            <span>All charges are billed in <strong>NGN</strong>. While the content of your cart is currently displayed in , the checkout will use <strong>NGN</strong> at the most current exchange rate.</span>
        </span>
    )
}

export default CartPolicy
