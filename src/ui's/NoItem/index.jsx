import React from 'react'
import { Link } from 'react-router-dom';

import './style.css';

function index({ title, img, linkAddress, linkText, margin }) {
    return (
        <div className='no--container'>
            <h3>{title}</h3>
            <img src={img} style={ margin ? { marginLeft: margin } : {}} alt={title} />
            <Link className='btn' to={linkAddress}>{linkText}</Link>
        </div>
    )
}

export default index