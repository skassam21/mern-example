import React, { Component } from 'react';
import Storage from './../../utils/storage';
import Api from './../../utils/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  showSignUp() {
    this.props.showSignUp();
  }

  handleSubmit(event) {
    event.preventDefault();
    Api.login(this.state.username, 
              this.state.password).then((value) => {
      this.props.goToFeed();
    }).catch((error) => {
      this.setState({
        errorMessage: error.error
      });
    });
  }

  render() {
    let formStyle = {
      marginTop: '10px',
      padding: '20px',
      border: '1px solid #eaeaea',
      borderRadius: '5px',
      backgroundColor: 'white'
    }

    let accountStyle = {
      marginTop: '20px',
      fontWeight: '300',
      fontSize: '14px'
    }

    let errorStyle = {
      fontSize: '14px'
    }

    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
        <form onSubmit={this.handleSubmit} style={formStyle}>
            <div className="form-group">
              <input type="text" className="form-control landing-page-form" name="username" placeholder="Username" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control landing-page-form" name="password" placeholder="Password" onChange={this.handleInputChange}/>
            </div>
            {this.state.errorMessage &&
              <div className="alert alert-danger" style={{padding: '10px'}}>
                { this.state.errorMessage }
              </div>
            }
            <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>
        <div>
          <p style={accountStyle}>Don't have an account? <a onClick={this.showSignUp}>Sign up</a></p>
        </div>
      </div>
      </div>

    )
  }
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateBlank = this.validateBlank.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'username') {
      let usernameRegex = /^[a-zA-Z\-\.0-9]+$/;
      if (value.match(usernameRegex) == null) {
        $(target).addClass('has-error');
      } else {
        $(target).removeClass('has-error');        
      }
    } else if (name === 'email') {
      let emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
      if (value.match(emailRegex) != null) {
        $(target).removeClass('has-error');        
      }
    } else if (name === 'password') {
      let passwordRegex = /.{6,}/;
      if (value.match(passwordRegex) != null) {
        $(target).removeClass('has-error');        
      }
    } else if (value.length > 0) {
      $(target).removeClass('has-error');
    }

    this.setState({
      [name]: value
    });      

  }

  handleBlur(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'email') {
      let emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
      if (value.match(emailRegex) == null) {
        $(target).addClass('has-error');
      } else {
        $(target).removeClass('has-error');        
      }
    } else if (name === 'password') {
      let passwordRegex = /.{6,}/;
      if (value.match(passwordRegex) == null) {
        $(target).addClass('has-error');
      } else {
        $(target).removeClass('has-error');        
      }
    } else if (value.length == 0) {
      $(target).removeClass('has-error');
    }
  }

  showLogin() {
    this.props.showLogin();
  }


  validateBlank(value, name) {
    if (!value) {
      let inputObj = $('input[name=\'' + name + '\']');
      inputObj.addClass('has-error');
      inputObj.focus();
      this.setState({errorMessage: name.substr(0,1).toUpperCase() + name.substr(1) + ' cannot be blank.'});
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

    let usernameRegex = /^[a-zA-Z_\.0-9]+$/;
    if (this.state.username.match(usernameRegex) == null) {
      this.setState({errorMessage: 'Usernames can only have letters, periods, underscores and numbers.'});
      return;
    }

    let emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
    if (this.state.email.match(emailRegex) == null) {
      this.setState({errorMessage: 'Please enter a valid email.'});
      return;
    }

    let passwordRegex = /.{6,}/;
    if (this.state.password.match(passwordRegex) == null) {
      this.setState({errorMessage: 'Passwords must be at least 6 letters long.'});
      return;
    }

    Api.signup(this.state.username, this.state.name, this.state.email, this.state.password).then((value) => {
      this.props.goToQuestions();
    }).catch((error) => {
      this.setState({
        errorMessage: error.error
      });
    });
  }

  render() {

    let formStyle = {
      marginTop: '10px',
      padding: '20px',
      border: '1px solid #eaeaea',
      borderRadius: '5px',
      backgroundColor: 'white'
    }

    let accountStyle = {
      marginTop: '20px',
      fontWeight: '300',
      fontSize: '14px'
    }

    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <form onSubmit={this.handleSubmit} style={formStyle}>
          <div className="form-group">
            <input type="text" className="form-control landing-page-form" name="username" placeholder="Username" onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
                <input type="text" className="form-control landing-page-form" name="name" placeholder="Full name" onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
                <input type="text" className="form-control landing-page-form" name="email" placeholder="Email" onChange={this.handleInputChange} onBlur={this.handleBlur}/>
          </div>
          <div className="form-group">
                <input type="password" className="form-control landing-page-form" name="password" placeholder="Password" onChange={this.handleInputChange} onBlur={this.handleBlur}/>
          </div>
          {this.state.errorMessage &&
              <div className="alert alert-danger" style={{padding: '10px'}}>
                { this.state.errorMessage }
              </div>
          }
          <button type="submit" className="btn btn-primary">SIGNUP</button>
        </form>
        <div>
          <p style={accountStyle}>Have an account? <a onClick={this.showLogin}>Login</a></p>
        </div>
        </div>
      </div>
    )
  }
}


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
