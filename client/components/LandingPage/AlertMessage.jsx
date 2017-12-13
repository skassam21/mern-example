import React from 'react';
import PropTypes from 'prop-types';

function AlertMessage(props) {
  const alertClassName = `alert alert-${props.alertType}`;
  const alertStyle = {
    fontSize: '14px',
    padding: '10px',
  };

  return (
    <div>
      {props.message &&
        <div className={alertClassName} style={alertStyle} >
          { props.message }
        </div>
      }
    </div>
  );
}

AlertMessage.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
