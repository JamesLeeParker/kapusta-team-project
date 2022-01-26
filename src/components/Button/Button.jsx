import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({
  type,
  buttonName,
  title,
  onClick,
  classStyle = 'Button',
}) => {
  return (
    <button
      type={type}
      name={buttonName}
      onClick={onClick}
      className={s[classStyle]}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  classStyle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Button;
