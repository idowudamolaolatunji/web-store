import React from 'react';

import './style.css';
import { AiOutlineClose } from 'react-icons/ai';

function ConfirmationModal({ title, children, handleClose }) {
    return (
        <div className='confirmation--modal'>
            <span className="modal--head">
                <p className="modal--heading">Confirm {title}</p>
                <AiOutlineClose className="modal--icon" onClick={handleClose} />
            </span>

            <div className="modal__content">{children}</div>
        </div>
    );
};

export default ConfirmationModal;