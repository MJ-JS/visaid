import React from 'react';
import PropTypes from 'prop-types';

require('../assets/styles.css');

class Button extends React.PureComponent {
  static propTypes = {
    // className: PropTypes.string.isRequired,
    // value: PropTypes.string,
    // disabled: PropTypes.bool,
    // name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      onClick,
      text,
    } = this.props;
    return (
      <button onClick={onClick}>
        {text}
      </button>
    );
  }
}
export default Button;
