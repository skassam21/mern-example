import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import LandingPage from './../LandingPage/LandingPage';
import s from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backgroundStyle = {
      width: '100%',
      minHeight: '100vh',
      height: '100%',
      backgroundColor: '#fafafa',
      backgroundAttachment: 'fixed'
    }

    return (
      <div style={backgroundStyle}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
