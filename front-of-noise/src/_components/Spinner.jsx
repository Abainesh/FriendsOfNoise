import React from 'react';
import PropTypes from 'prop-types';

const loading = '@keyframes r-bars-loading-animation {'
    + '0% { transform: scale(1); }'
    + '20% { transform: scale(1, 1.8); }'
    + '40% { transform: scale(1); }'
    + '}';

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
head.appendChild(style);
const styleSheet = style.sheet;
styleSheet.insertRule(loading, styleSheet.cssRules && styleSheet.cssRules.length);

const styles = {
    loading: {
        position: 'relative'
    },
    loadingBar: {
        display: 'inline-block',
        width: '4px',
        height: '18px',
        borderRadius: '4px',
        backgroundColor: '#444444',
        margin: '1px'
    },
    n1: {
        animation: 'r-bars-loading-animation 1s ease-in-out infinite'
    },
    n2: {
        animation: 'r-bars-loading-animation 1s ease-in-out .09s infinite'
    },
    n3: {
        animation: 'r-bars-loading-animation 1s ease-in-out .18s infinite'
    },
    n4: {
        animation: 'r-bars-loading-animation 1s ease-in-out .27s infinite'
    }
};

/**
 * Loader
 *
 * @returns {ReactDom}
 * @example
 * // just as a dummy component
 * import { Spinner } from 'prg-editor';
 *
 * <Spinner />
 */
function Spinner ({ minHeight }) {
    return (<div
        className="columns is-vcentered is-centered"
        style={{
            minHeight,
            margin: ''
        }}
    >
        <div
            className="column loading has-text-centered"
            style={styles.loading}
        >
            <div className="loading-bar" style={Object.assign(styles.n1, styles.loadingBar)} />
            <div className="loading-bar" style={Object.assign(styles.n2, styles.loadingBar)} />
            <div className="loading-bar" style={Object.assign(styles.n3, styles.loadingBar)} />
            <div className="loading-bar" style={Object.assign(styles.n4, styles.loadingBar)} />
        </div>
    </div>);
}

Spinner.propTypes = {
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Spinner.defaultProps = {
    minHeight: '20vh'
};

export default Spinner;
