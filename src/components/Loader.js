import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ customClass }) => {
    return (
        <i 
            className={`fa fa-spinner fa-pulse fa-3x fa-fw ${customClass}`}
        />
    )
}

Loader.propTypes = {
    customClass: PropTypes.string,
}

export default Loader;
