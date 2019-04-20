import React from 'react';
import PropTypes from 'prop-types';

function Control ({ className, children }) {
    let controlClass = 'control';
    if (className) {
        controlClass += ` ${className}`;
    }
    return (<div className={controlClass}>
        {children}
    </div>);
}

Control.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any])
};

Control.defaultProps = {
    className: null,
    children: null
};

export default Control;
