import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getValue, createTree } from './path';

/**
 * Basic form element
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `className` | `string` | | form class name
 * | `values` | `object` | | values to fill the form
 * | `onChange` | `function` | `(inputName, input) => {}`) | form change handler
 * | `onSubmit` | `function` | `(values) => {}` | fired after form submit
 *
 * @class Form
 * @extends {Component}
 * @example
 * import { Form, Input } from 'prg-form';
 *
 * function MyForm ({ values }) {
 *     return (
 *         <Form
 *             className="special-class"
 *             onSubmit={(values, form) => console.log(values)}
 *             onChange={(input) => console.log(input.name, input.getValue())}
 *             values={values}
 *         >
 *              <Input type="email" name="inputName" label="Input Label" />
 *         </Form>
 *     );
 * }
 */
class Form extends Component {

    constructor (props) {
        super(props);

        this.inputs = new Map();
    }

    getChildContext () {
        return {
            inputWillMount: input => this.inputWillMount(input),
            onChangeInput: input => this.onChangeInput(input),
            inputWillUnmount: input => this.inputWillUnmount(input)
        };
    }

    componentDidUpdate (prevProps) {
        if (prevProps.values !== this.props.values) {
            this.inputs.forEach((input, name) => {
                input.setValue(getValue(this.props.values, name));
            });
        }
    }

    onChangeInput (input) {
        this.props.onChange(input);
    }

    onSubmit (e) {
        this.props.onSubmit(this.getValues(), this);
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Returns current form data
     *
     * @returns {Object}
     *
     * @memberOf Form
     */
    getValues () {
        const ret = {};
        this.inputs.forEach((input, name) => {
            createTree(input.getValue(), name, ret);
        });
        return ret;
    }

    /**
     * Sets errors to form. Use empty object to remove all errors
     *
     * @param {Object} errorList
     *
     * @memberOf Form
     * @example
     * // set signle error to inputName
     * form.setErrors({ inputName: 'Error text' });
     */
    setErrors (errorList) {
        this.inputs.forEach((input, name) => {
            if (typeof errorList[name] !== 'undefined') {
                input.setError(errorList[name]);
            } else {
                input.setError(null);
            }
        });
    }

    /**
     * Resets form without trigging the onChange method
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
        this.inputs.forEach((input, name) => {
            if (data !== null) {
                input.resetValue(getValue(this.props.values, name));
            } else {
                input.resetValue();
            }
        });
    }

    inputWillMount (input) {
        this.inputs.set(input.name, input);
        input.setValue(getValue(this.props.values, input.name));
    }

    inputWillUnmount (input) {
        this.inputs.delete(input.name);
    }

    render () {
        const { children, className } = this.props;
        return (<form
            onSubmit={e => this.onSubmit(e)}
            className={className}
        >
            {children}
        </form>);
    }

}

Form.childContextTypes = {
    inputWillMount: PropTypes.func,
    onChangeInput: PropTypes.func,
    inputWillUnmount: PropTypes.func
};

Form.propTypes = {
    className: PropTypes.string,
    values: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.oneOfType([PropTypes.any]),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
};

Form.defaultProps = {
    values: {},
    className: null,
    children: null,
    onChange: () => {},
    onSubmit: () => {}
};

export default Form;
