import React from 'react';

import Styles from './spinner.module.css';

function MiniSpinner({ isBlack }) {
    return (
        <>
            {isBlack ? (
                <div className={Styles.mini__spinner__is__black}></div>
            ) : (
                <div className={Styles.mini__spinner}></div>
            )}
        </>
    )
}

export default MiniSpinner
