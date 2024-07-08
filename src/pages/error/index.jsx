import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Styles from './error.module.css';
import { IoIosLink } from 'react-icons/io';

function index() {
    return (
        <>
            <Header />
            <div className={Styles.error__container}>
                <h1 className={Styles.error__heading}>404 <span>ERROR</span></h1>
                <p className={Styles.error__text}>Sorry! That page can't be found.</p>
                <Link to={'/'} className={Styles.error__btn}> <IoIosLink className="icon" /> Go to Homepage</Link>
            </div>
            <Footer />
        </>
    )
}

export default index
