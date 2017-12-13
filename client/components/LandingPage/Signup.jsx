import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './../../utils/api';
import InputElement from './InputElement';
import AlertMessage from './AlertMessage';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      errorMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateBlank = this.validateBlank.bind(this);

    // Some constants
    this.emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
    this.usernameRegex = /^[a-zA-Z\-.0-9]+$/;
    this.passwordRegex = /.{6,}/;
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    const targetObj = $(target);

    if (name === 'username') {
      if (value.match(this.usernameRegex) == null) {
        targetObj.addClass('has-error');
      } else {
        targetObj.removeClass('has-error');
      }
    } else if (name === 'email') {
      if (value.match(this.emailRegex) != null) {
        targetObj.removeClass('has-error');
      }
    } else if (name === 'password') {
      if (value.match(this.passwordRegex) != null) {
        targetObj.removeClass('has-error');
      }
    } else if (value.length > 0) {
      targetObj.removeClass('has-error');
    }

    this.setState({
      [name]: value,
    });
  }

  handleBlur(event) {
    const { target } = event;
    const { value, name } = target;
    const targetObj = $(target);

    if (name === 'email') {
      if (value.match(this.emailRegex) == null) {
        targetObj.addClass('has-error');
      } else {
        targetObj.removeClass('has-error');
      }
    } else if (name === 'password') {
      if (value.match(this.passwordRegex) == null) {
        targetObj.addClass('has-error');
      } else {
        targetObj.removeClass('has-error');
      }
    } else if (value.length === 0) {
      targetObj.removeClass('has-error');
    }
  }

  showLogin() {
    this.props.showLogin();
  }

  validateBlank(value, name) {
    if (!value) {
      const inputObj = $(`input[name='${name}']`);
      const errorMessage = `${name.substr(0, 1).toUpperCase()}${name.substr(1)} cannot be blank.`;

      inputObj.addClass('has-error');
      inputObj.focus();
      this.setState({
        errorMessage,
      });
      return true;
    }
    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateBlank(this.state.username, 'username') ||
      this.validateBlank(this.state.name, 'name') ||
      this.validateBlank(this.state.email, 'email') ||
      this.validateBlank(this.state.password, 'password')) {
      return;
    }

    if (this.state.username.match(this.usernameRegex) == null) {
      this.setState({ errorMessage: 'Usernames can only have letters, periods, underscores and numbers.' });
      return;
    }

    if (this.state.email.match(this.emailRegex) == null) {
      this.setState({ errorMessage: 'Please enter a valid email.' });
      return;
    }

    if (this.state.password.match(this.passwordRegex) == null) {
      this.setState({ errorMessage: 'Passwords must be at least 6 letters long.' });
      return;
    }

    Api.signup(
      this.state.username,
      this.state.name,
      this.state.email,
      this.state.password,
    ).then(() => {
      this.props.goToApp();
    }).catch((error) => {
      this.setState({
        errorMessage: error.error,
      });
    });
  }

  render() {
    const formStyle = {
      marginTop: '10px',
      padding: '20px',
      border: '1px solid #eaeaea',
      borderRadius: '5px',
      backgroundColor: 'white',
    };

    const accountStyle = {
      marginTop: '20px',
      fontWeight: '300',
      fontSize: '14px',
    };

    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <form
            onSubmit={this.handleSubmit}
            style={formStyle}
          >
            <InputElement
              type="text"
              name="username"
              placeholder="Username"
              handleChange={this.handleInputChange}
            />
            <InputElement
              type="text"
              name="name"
              placeholder="Full Name"
              handleChange={this.handleInputChange}
            />
            <InputElement
              type="text"
              name="email"
              placeholder="Email"
              handleChange={this.handleInputChange}
              handleBlur={this.handleBlur}
            />
            <InputElement
              type="password"
              name="password"
              placeholder="Password"
              handleChange={this.handleInputChange}
              handleBlur={this.handleBlur}
            />
            <AlertMessage message={this.state.errorMessage} alertType="danger" />
            <button type="submit" className="btn btn-primary">SIGNUP</button>
          </form>
          <div>
            <p style={accountStyle}>
              Have an account?&nbsp;
              <button type="button" className="btn-link" onClick={this.showLogin}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  showLogin: PropTypes.func.isRequired,
  goToApp: PropTypes.func.isRequired,
};

export default Signup;
