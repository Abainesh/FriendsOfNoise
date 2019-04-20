import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

class ValidatorForm extends Component {

    constructor (props) {
        super(props);

        this.form = null;
    }

    onChange (input) {
        const { validator, validatorContext, t, onChange } = this.props;
        onChange(input);
        validator.validateProp(input.name, input.getValue(), validatorContext, this.getValues())
            .then(() => input.setError(null))
            .catch((e) => {
                input.setError(t(e.message));
            });
    }

    onSubmit (data, form) {
        this.props.onBeforeValidate(data);
        this.props.validator.validate(data, this.props.validatorContext, true)
            .then(() => form.setErrors({}))
            .then(() => this.props.onSubmit(data, form))
            .catch((errors) => {
                this.props.onValidationFailed(errors);
                if (Array.isArray(errors)) {
                    form.setErrors(errors
                        .reduce((obj, e) => Object.assign(obj, {
                            [e.property]: this.props.t(e.message)
                        }), {})
                    );
                } else if (typeof errors === 'object' && !(errors instanceof Error)) {
                    form.setErrors(errors);
                } else {
                    throw errors;
                }
            });
    }

    /**
     * Returns form values
     *
     * @returns {object}
     *
     * @memberOf ValidatorForm
     */
    getValues () {
        if (!this.form) {
            return {};
        }
        return this.form.getValues();
    }

    /**
     * Resets form without trigging the validation
     *
     * @param {Object} [data]
     *
     * @memberOf Form
     * @example
     * // makes form empty and resets all errors
     * form.reset();
     *
     * // sets data and resets all errors without trigging the validation
     * form.reset();
     */
    reset (data = null) {
        this.form.reset(data);
    }

    render () {
        const { values, children, className } = this.props;
        return (<Form
            values={values}
            onSubmit={(data, form) => this.onSubmit(data, form)}
            onChange={data => this.onChange(data)}
            ref={(el) => { this.form = el; }}
            className={className}
        >
            {children}
        </Form>);
    }

}

/**
 * @type {object}
 */
ValidatorForm.propTypes = {
    t: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any]),
    values: PropTypes.objectOf(PropTypes.any),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onBeforeValidate: PropTypes.func,
    onValidationFailed: PropTypes.func,
    validatorContext: PropTypes.string,
    validator: PropTypes.shape({
        validateProp: PropTypes.func,
        validate: PropTypes.func
    }).isRequired
};

ValidatorForm.defaultProps = {
    className: null,
    children: null,
    values: null,
    t: w => w,
    validatorContext: null,
    onSubmit: () => {},
    onChange: () => {},
    onBeforeValidate: () => {},
    onValidationFailed: () => {}
};

export default ValidatorForm;
