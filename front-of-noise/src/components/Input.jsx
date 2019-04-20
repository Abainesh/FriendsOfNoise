import BaseInput from './BaseInput';


/**
 * Basic input component.
 * In addition to {BaseInput} has theese props:
 *
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `name` | `string` | **required** | input name (you can use dots and array indexes)
 * | `placeholder` | `string` | | input placeholder
 * | `label` | `string` | | input label
 * | `type` | `string` | `"text"` |  input type
 * | `className` | `string` | | input class
 * | `controlClass` | `string` | | surrounding paragraph class
 * | `defaultValue` | `any` | | is used, when input value is falsey
 * | `value` | `any` | | use, when input is operated outside `<Form>`
 * | `onChange` | `function` | `(value, input) => {}` | fired, when input is changed
 * | `onFocus` | `function` | `(input) => {}` | fired, when input is focused
 * | `onBlur` | `function` | `(input) => {}` | fired, when input is blured
 * | `disabled` | `boolean` | | disable input
 * | `readOnly` | `boolean` | | only read
 * | `required` | `boolean` | | input is required - HTML attribute
 * | `maxLength` | `number` | | maximal length
 * | `iconBefore` | `any`   | | content shown before input
 *
 * @class Input
 * @extends {BaseInput}
 * @example
 * <Input
 *     name="inputName"
 *     type="email"
 *     iconBefore={<i className="fa fa-meetup" />}
 * />
 */
class Input extends BaseInput {

}

Input.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    type: 'text',
    defaultInputClass: 'input',
    defaultValue: ''
});


export default Input;
