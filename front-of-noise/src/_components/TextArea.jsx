import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

class TextArea extends BaseInput {

    renderInput () {
        const {
            disabled,
            name,
            placeholder,
            cols,
            rows,
            required,
            readOnly,
            maxLength
        } = this.props;
        const { value } = this.state;

        return (<textarea
            id={this.id}
            className={this.getInputClass()}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            value={value}
            cols={cols}
            rows={rows}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
            maxLength={maxLength}
        />);
    }

}

TextArea.propTypes = Object.assign({}, BaseInput.propTypes, {
    cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

TextArea.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    rows: 5,
    defaultInputClass: 'textarea',
    defaultValue: ''
});

export default TextArea;
