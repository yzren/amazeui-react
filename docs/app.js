'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = require('history');
var createHistory = History.createHistory;
var useBasename = History.useBasename;
var history = useBasename(createHistory)({
  basename: '/react'
});

var GoTop = require('../src/GoTop');
var production = require('./utils').isProduction;
var DocHeader = require('./zero/DocHeader');
var DocFooter = require('./zero/DocFooter');

var App = React.createClass({
  render: function() {
    return (
      <div className="amr-page">
        <DocHeader />
        {this.props.children}
        <DocFooter />
        <GoTop theme="fixed" autoHide icon="arrow-up" />
      </div>
    );
  }
});

// Pages
var PageIndex = require('./zero/PageIndex');
var PageGettingStarted = require('./zero/PageGettingStarted');
var PageComponents = require('./zero/PageComponents');
var PageComponentsIndex = require('./zero/PageComponentsIndex');
var PageComponentsDoc = require('./zero/PageComponentsDoc');

var routes = (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="getting-started" component={PageGettingStarted} />
      <Route path="components" component={PageComponents}>
        <Route path=":component" component={PageComponentsDoc} />
        <IndexRoute component={PageComponentsIndex} />
      </Route>
      <IndexRoute component={PageIndex} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('root'));
});
