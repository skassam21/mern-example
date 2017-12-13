import React from 'react';
import PropTypes from 'prop-types';

function InputElement(props) {
  return (
    <div className="form-group">
      <input
        type={props.type}
        className="form-control landing-page-form"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleInputChange}
        onBlur={props.handleBlur}
      />
    </div>
  );
}

InputElement.propTypes = {
  name: PropTypes.string.isRequired, 
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func,
  handleBlur: PropTypes.func
};

export default InputElement;
