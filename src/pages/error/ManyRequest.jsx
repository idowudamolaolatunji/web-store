import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Styles from './error.module.css';

function ManyRequest() {
    return (
        <>
            <Header />
            <div className={Styles.error__container}>
                <h1 className={Styles.error__heading}>429 <span>ERROR</span></h1>
                <p className={Styles.error__text}>Too many request from this IP, please try again in an hour!</p>
            </div>
            <Footer />
        </>
    )
}

export default ManyRequest
