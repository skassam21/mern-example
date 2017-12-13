import React, { Component } from 'react';
import Storage from './../../utils/storage';
import Api from './../../utils/api';
import InputElement from './InputElement';


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false
    };

    this.showSignUp = this.showSignUp.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.goToQuestions = this.goToQuestions.bind(this);
    this.goToFeed = this.goToFeed.bind(this);
  }

  showSignUp() {
    this.setState({showLogin: false});
  }

  showLogin() {
    this.setState({showLogin: true});
  }

  goToFeed() {
    this.props.history.push('/feed');
  }

  goToQuestions() {
    this.props.history.push('/questions/1');
  }

  componentWillMount() {
    if (Storage.get('JWToken') && Storage.get('User')) {
      this.props.history.replace("feed/");
    }
  }

  render() {
	  let containerStyle = {
	     textAlign: 'center',
       margin: 'auto',
       position: 'absolute',
       top : '20%',
       left : '0',
       right : '0'
    }

    let buttonStyle = {
      margin: '5px',
      marginTop: '15px'
    }

    let form = <Login showSignUp={this.showSignUp} goToFeed={this.goToFeed}/>;
    if (!this.state.showLogin) {
      form = <Signup showLogin={this.showLogin} goToQuestions={this.goToQuestions}/>;
    }

    return (
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
              <h1>Example App</h1>
        		  <p>Here is a description for an example app.</p>
              { form }
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
