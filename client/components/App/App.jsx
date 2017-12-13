import React from 'react';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import LandingPage from './../LandingPage/LandingPage';
import s from './App.scss'; // eslint-disable-line no-unused-vars

function App() {
  const backgroundStyle = {
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: '#fafafa',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={backgroundStyle}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
