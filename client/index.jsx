import 'jquery';
import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

const element = React.createElement(App, {});
render(element, document.getElementById('content'));
