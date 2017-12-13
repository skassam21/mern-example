import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './../../utils/api';
import InputElement from './InputElement';
import AlertMessage from './AlertMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  showSignUp() {
    this.props.showSignUp();
  }

  handleSubmit(event) {
    event.preventDefault();
    Api.login(
      this.state.username,
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
              name="username"
              placeholder="Username"
              handleChange={this.handleInputChange}
            />
            <AlertMessage message={this.state.errorMessage} alertType="danger" />
            <button type="submit" className="btn btn-primary">LOGIN</button>
          </form>
          <div>
            <p style={accountStyle}>
              Don&apos;t have an account?&nbsp;
              <button type="button" className="btn-link" onClick={this.showSignUp}>
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  showSignUp: PropTypes.func.isRequired,
  goToApp: PropTypes.func.isRequired,
};

export default Login;
