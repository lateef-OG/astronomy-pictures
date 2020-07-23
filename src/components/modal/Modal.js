import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import './modal.css';

const Modal = ({ show, children, toggleModal}) => {
    return (
        <div className={`overlay ${show ? 'display' : ''}`}>
            <div className="content">
                <Icon 
                    customClass="fas fa-times-circle close"
                    handleClick={toggleModal}
                />
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    toggleModal: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.node
}

export default Modal;
