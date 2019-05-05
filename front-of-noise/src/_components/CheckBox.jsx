import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';
import Control from './Control';

class Checkbox extends BaseInput {

    constructor (props, context) {
        super(props, context);

        const useValue = props.value || props.defaultValue;

        this.state.value = this._getCheckValue(useValue === props.checkValue);
    }

    _getCheckValue (checked) {
        const { checkValue } = this.props;
        if (typeof checkValue === 'boolean') {
            return !!(checked ^ !checkValue); // eslint-disable-line
        }
        return checked ? checkValue : null;
    }

    setValue (input) {
        let value;
        const { defaultValue, checkValue } = this.props;
        const useDefaultValue = typeof input === 'undefined'
            || (input === null && typeof checkValue === 'boolean');

        if (useDefaultValue) {
            value = this._getCheckValue(defaultValue === checkValue);
        } else {
            value = this._getCheckValue(input === checkValue);
        }
        if (this.mounted) {
            this.setState({ value });
        }
        return value;
    }

    onChange (e) {
        const value = this._getCheckValue(e.target.checked);
        if (this.mounted) {
            this.setState({ value });
        }
        this.props.onChange(value, this);
    }

    renderInput () {
        const { type, disabled, name, placeholder, required, checkValue, readOnly } = this.props;
        const { value } = this.state;

        return (<input
            id={this.id}
            className={this.getInputClass()}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            checked={value === checkValue}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
        />);
    }

    render () {
        const { label } = this.props;

        if (!label) {
            return (<Control className={this.getControlClass()}>
                {this.renderIconBefore()}
                {this.renderInput()}
                {this.renderIcon()}
                {this.renderError()}
            </Control>);
        }

        return (<Control className={this.getControlClass()}>
            <label className="checkbox" htmlFor={this.id}>
                {this.renderInput()}
                {label}
                {this.renderIcon()}
            </label>
            {this.renderError()}
        </Control>);
    }

}

Checkbox.propTypes = Object.assign({}, BaseInput.propTypes, {
    checkValue: PropTypes.oneOfType([PropTypes.any])
});

Checkbox.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    type: 'checkbox',
    defaultInputClass: 'checkbox',
    defaultValue: false,
    checkValue: true
});

export default Checkbox;
