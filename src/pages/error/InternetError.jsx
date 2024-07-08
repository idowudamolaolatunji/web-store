import React from 'react'

import Styles from './error.module.css';
import { IoIosLink } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function InternetError({ message }) {
    const navigate = useNavigate();

    function handleLinkClick() {
        message ? navigate(-1) : navigate(0)
    }

    return (
        <div className={Styles.error__container}>
            <h1 className={Styles.error__heading}>
                {message ? '404' : '400'} <span>ERROR</span>
            </h1>
            <p className={Styles.error__text}>
                {message || 'Check internet connection and try again!'}
            </p>
            <button className={Styles.error__btn} onClick={handleLinkClick}>
                <IoIosLink className="icon" />
                {message ? 'Go Back' : 'Refresh Page'}
            </button>
        </div>
    )
}

export default InternetError
