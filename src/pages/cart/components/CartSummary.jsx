import React, { useState } from 'react';
import Select from 'react-select';
import CollapsibleSpan from 'react-collapsible'
import AutosizeTextarea from 'react-textarea-autosize'
import { RiArrowDropDownLine } from 'react-icons/ri';
import CartPolicy from './CartPolicy';
import { useCartContext } from '../../../contexts/cartContext';
import { currencyConverter, numberConverter } from '../../../utils/helper';
import { PiLockFill } from 'react-icons/pi';
import { useWindowSize } from 'react-use';



function CartSummary() {
    const [selectedOption, setSelectedOption] = useState(null);
    const { cartItems, totalPrice } = useCartContext();
    
    const deliveryFee = totalPrice >= 100000 ? 0.00 : 2000;
    const { width } = useWindowSize();

    const options = [
        { value: 'free-delevery', label: 'Free delivery' },
        { value: '10-percent-discount', label: '10% off' },
        { value: '30-percent-discount', label: '30% off' },
        // { value: 'free-product', label: 'Free products' },
    ];

    return (
        <div className='cart__summary'>
            <div className="summary--figure">
                <h4 className="summary--heading">Cart Summary</h4>

                <div className="summary--details-box">
                    <div className="summary--coupon-input">
                        <input type="text" className="" placeholder='Discount Code' />
                        <button type='button'>Apply</button>
                    </div>

                    <div className="summay--details">
                        <span className='summary--info'>
                            <p className='info--text'>Product(s) price</p>
                            <span className='info--price'>₦{currencyConverter(totalPrice)}</span>
                        </span>

                        <span className='summary--info'>
                            <p className='info--text'>Delivery fee</p>
                            <span className='info--price'>₦{currencyConverter(deliveryFee)}</span>
                        </span>

                        <span className='summary--info'>
                            <p className='info--text'>Usable rewards</p>
                            <Select
                                className='info--select'
                                defaultValue={selectedOption}
                                // onChange={() => setSelectedOption()}
                                options={options}
                            />
                        </span>

                        <CollapsibleSpan trigger={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p className='info--text'>Special instructions for order</p>
                                <RiArrowDropDownLine className='icon' />
                            </div>
                        } className='summary--collapse'>
                            <AutosizeTextarea className='info--textarea' placeholder="Message..." />
                        </CollapsibleSpan>
                    </div>
                </div>

                <div className="summary-sub-total">
                    <span className='summary--info'>
                        <p>Total</p>
                        <span>₦{currencyConverter(totalPrice + deliveryFee)}</span>
                    </span>

                    <button type='button'><PiLockFill className="icon" /> Proceed to Checkout</button>
                </div>
            </div>

            {(cartItems?.length > 2 || width < 450) && (
                <CartPolicy />
            )}
        </div>
    )
}

export default CartSummary
