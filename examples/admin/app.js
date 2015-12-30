import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import {
  Breadcrumb,
} from 'amazeui-react';

// style
import './app.less';

// components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

var App = React.createClass({
  render() {
    return (
      <div className="adm-container">
        <Header />
        <Sidebar />
        <div className="adm-main">
          <Breadcrumb slash>
            <Breadcrumb.Item href="http://www.amazeui.org">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="http://www.amazeui.org">分类</Breadcrumb.Item>
            <Breadcrumb.Item active>内容</Breadcrumb.Item>
          </Breadcrumb>
          {this.props.children}
        </div>
      </div>
    );
  },
});

const Page = React.createClass({
  render() {
    return (
      <div>
        page: {this.props.params.page}
      </div>
    );
  }
});


const routes = (
  <Router>
    <Route path="/" component={App}>
      <Route path=":page" component={Page} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app-root'));
