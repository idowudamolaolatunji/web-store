import React from 'react'
import Overlay from '../Overlay';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

import './style.css'


function index({ setShow }) {

    const handleCloseModal = () => setShow(false);

    return (
        <>
            <Overlay handleClose={handleCloseModal} />
            <div className='search__sidebar'>
                <div className="sidebar--heading-box">
                    <h5 className='sidebar--heading'>Search</h5>
                    <AiOutlineClose className='icon' onClick={handleCloseModal} />
                </div>

                <div className="sidebar--input-box">
                    <input type="text" className="sidebar--input" placeholder='Search anything..' />

                    <div className="header__icon">
                        <IoSearchOutline className="icon__el" />
                    </div>
                </div>


                <div className="sidebar--content">

                </div>
            </div>
        </>
    )
}

export default index
