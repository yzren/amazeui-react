import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import {
  Button
} from 'amazeui-react';

// style
import './app.less';

// components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Index from './components/Index';

var App = React.createClass({
  render() {
    return (
      <div className="adm-container">
        <Header />
        <div className="adm-main">
          {this.props.children}
        </div>
      </div>
    );
  },
});

const routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app-root'));
