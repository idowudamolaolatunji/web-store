import React from 'react';

import Styles from './spinner.module.css';

function MainSpinner() {
    return (
        <div className={Styles.spinner__overlay}>
            <div className={Styles.spinner}></div>
        </div>
    );
}

export default MainSpinner


