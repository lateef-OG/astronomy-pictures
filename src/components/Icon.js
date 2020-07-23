import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ customClass, handleClick }) => {
    return (
        <i className={customClass} onClick={handleClick} />
    )
}

Icon.propTypes = {
    customClass: PropTypes.string,
    handleclick: PropTypes.func
}

export default Icon;
