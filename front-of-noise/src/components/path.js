function pathToDots (path) {
    return `${path}`.replace(/\[([^\]]+)]/g, '.$1')
        .replace(/^\./, '')
        .split('.');
}

export function shallowDiff (old, current) {
    let has = 0;
    let left;
    let right;
    const differences = Object.keys(old)
        .filter((key) => {
            if (!{}.hasOwnProperty.call(current, key)) {
                return true;
            }
            has++;

            left = old[key];
            right = current[key];

            // normalize
            left = left === 0 ? '0' : `${left || ''}`;
            right = right === 0 ? '0' : `${right || ''}`;

            return left !== right;
        });

    if (has !== Object.keys(current).length) {
        Object.keys(current)
            .forEach((key) => {
                if (!{}.hasOwnProperty.call(old, key)) {
                    differences.push(key);
                }
            });
    }

    return differences;
}

export function createTree (value, path, object = undefined) {
    if (typeof path === 'undefined') {
        if (object && !Array.isArray(value)) {
            object.push(value);
            return object;
        }
        return value;
    }
    let ret = object;
    const [attr, ...nextPath] = pathToDots(path);
    const keyAsNum = parseInt(attr, 10);
    const isArray = !isNaN(keyAsNum);
    let key = attr;

    if (isArray) {
        if (isArray) {
            key = keyAsNum;
        }
        if (ret === undefined) {
            ret = [];
        }
    } else if (ret === undefined) {
        ret = {};
    }

    if (attr.match(/\[\]$/) && nextPath.length === 0) {
        key = key.replace(/\[\]$/, '');
        if (ret[key] === undefined) {
            ret[key] = [];
        }
    }

    ret[key] = createTree(value, nextPath.join('.') || undefined, ret[key]);
    return ret;
}

export function shallowToDeep (shallowObject) {
    const ret = {};
    if (typeof shallowObject !== 'object' || shallowObject === null) {
        return ret;
    }
    Object.keys(shallowObject)
        .forEach((key) => {
            createTree(shallowObject[key], key, ret);
        });
    return ret;
}

export function pathToFormBrackets (path) {
    if (path === undefined || path === null) {
        return path;
    }
    return `${path}`.replace(/\.([^.[\]]+)/g, '[$1]');
}

/**
 * Flatterns deep object into flat structure
 *
 * @export
 * @param {Object} object - input object
 * @param {boolean} [useFormBrackets=false] - uses brackets instead of dot notation
 * @returns {Object}
 * @example
 * import { flat } from 'prg-form';
 *
 * const res = flat({ array: [{ attr: 'foo' }] });
 * console.log(res['array[0].attr']); // foo
 */
export function flat (object, useFormBrackets = false, path = '', ret = {}) {
    let key;
    if (Array.isArray(object)) {
        object.forEach((elem, i) => {
            key = `${path}[${i}]`;
            flat(elem, useFormBrackets, key, ret);
        });
    } else if (typeof object === 'object' && object !== null && object.constructor === Object) {
        Object.keys(object)
            .forEach((attr) => {
                if (useFormBrackets && path) {
                    key = `${path}[${attr}]`;
                } else {
                    key = `${path}${(path ? '.' : '')}${attr}`;
                }
                flat(object[attr], useFormBrackets, key, ret);
            });
    } else if (path) {
        ret[path] = object; // eslint-disable-line no-param-reassign
    }
    return ret;
}

export function getValue (obj, path) {
    return pathToDots(path)
        .reduce((prev, key) => {
            if (typeof prev !== 'object') {
                return prev;
            } else if (prev === null) {
                return undefined;
            }
            return prev[key];
        }, obj || {});
}

export function join (pathAsArray) {
    if (!Array.isArray(pathAsArray)) {
        return '';
    }
    return pathAsArray
        .reduce((prev, key) => {
            if (typeof key === 'number') {
                return `${prev}[${key}]`;
            }
            return `${prev}.${key}`;
        }, '')
        .replace(/^\./, '');
}

export default { flat, getValue, join, shallowDiff, shallowToDeep, pathToFormBrackets };
