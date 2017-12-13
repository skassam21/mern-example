import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from './../../utils/storage';
import Signup from './Signup';
import Login from './Login';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
    };

    this.showSignUp = this.showSignUp.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.goToApp = this.goToApp.bind(this);
  }

  componentWillMount() {
    if (Storage.get('JWToken') && Storage.get('User')) {
      this.props.history.replace('/app');
    }
  }

  showSignUp() {
    this.setState({ showLogin: false });
  }

  showLogin() {
    this.setState({ showLogin: true });
  }

  goToApp() {
    this.props.history.push('/app');
  }

  render() {
    const containerStyle = {
      textAlign: 'center',
      margin: 'auto',
      position: 'absolute',
      top: '20%',
      left: '0',
      right: '0',
    };

    let form = <Login showSignUp={this.showSignUp} goToApp={this.goToApp} />;
    if (!this.state.showLogin) {
      form = <Signup showLogin={this.showLogin} goToApp={this.goToApp} />;
    }

    return (
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10
            col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1"
          >
            <h1>Example App</h1>
            <p>Here is a description for an example app.</p>
            { form }
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingPage;
