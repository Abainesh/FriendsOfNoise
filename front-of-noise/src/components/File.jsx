import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

/**
 * File upload component
 *
 * @class Input
 * @extends {BaseInput}
 * @example
 * // as single file
 * <File
 *     name="inputName"
 *     iconBefore={<i className="fa fa-meetup" />}
 *     onChange={(file) => file instanceof File} // native File object
 * />
 *
 * // as multiple files files
 * <File
 *     name="inputName[]" // do not forget to use with brackets
 *     iconBefore={<i className="fa fa-meetup" />}
 *     onChange={(files) => Array.isArray(files) && files[0] instanceof File} // native File object
 * />
 */
class File extends BaseInput {

    constructor (props, context) {
        super(props, context);

        if (props.multiple && !this.name.match(/\[\]$/)) {
            this.name = `${this.name}[]`;
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            const isEmpty = this.state.value === null || this.state.value.length === 0;

            if (prevState.value && this.mounted && isEmpty) {
                this.element.value = '';
            }

            if (this.context.onChangeInput && !this.inReset) {
                this.context.onChangeInput(this);
            }
        }
        this.inReset = false;
    }

    setValue (value) {
        let set;
        if (value === null || typeof value === 'undefined') {
            set = this.props.multiple ? [] : null;
        } else {
            set = value;
        }
        if (this.mounted) {
            this.setState({ value: set });
        }
        return set;
    }

    onChange (e) {
        let newValue = e.target.files;
        if (this.props.multiple) {
            newValue = new Array(newValue.length);
            for (let i = 0; i < e.target.files.length; i++) {
                newValue[i] = e.target.files[i];
            }
        } else if (newValue.length === 0) {
            newValue = null;
        } else if (!this.props.multiple) {
            newValue = newValue[0];
        }
        const val = this.setValue(newValue);
        this.props.onChange(val, this);
        if (this.context.onChangeInput
            && val === this.state.value
            && !this.inReset) {

            this.context.onChangeInput(this);
        }
    }

    renderInput () {
        const { disabled, name, required, readOnly, multiple } = this.props;

        return (<input
            id={this.id}
            className={this.getInputClass()}
            name={name}
            type="file"
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
            multiple={multiple}
        />);
    }

}

File.propTypes = Object.assign({}, BaseInput.propTypes, {
    multiple: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});

File.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    type: 'file',
    defaultInputClass: 'file',
    defaultValue: null
});


export default File;
