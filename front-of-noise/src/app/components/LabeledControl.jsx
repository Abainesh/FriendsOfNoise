import React from 'react';
import PropTypes from 'prop-types';
import Control from './Control';

function LabeledControl (props) {
    const { label, id } = props;

    if (!label) {
        return <Control {...props} />;
    }

    return (<div className="field">
        <label className="label" htmlFor={id}>{label}</label>
        <Control {...props} />
    </div>);
}

LabeledControl.propTypes = {
    label: PropTypes.oneOfType([PropTypes.any]),
    id: PropTypes.string
};

LabeledControl.defaultProps = {
    label: null,
    id: null
};

export default LabeledControl;
