import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import {
  Icon,
} from 'amazeui-react';

// style
import './app.less';

// components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import About from './pages/About';

const pages = {
  home: Home,
  about: About,
};

var App = React.createClass({
  getInitialState() {
    return {
      sidebarActive: false,
    };
  },

  toggleSidebar() {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    });
  },

  render() {
    const {
      sidebarActive,
      } = this.state;

    return (
      <div className="adm-container">
        <Header />
        <Sidebar active={sidebarActive} />
        <div className="adm-main">
          {this.props.children}
        </div>
        <Icon
          button
          amStyle="primary"
          icon={sidebarActive ? 'close' : 'bars'}
          className="adm-sidebar-toggle am-show-sm-only"
          onClick={this.toggleSidebar}
        />
      </div>
    );
  },
});

const Page = React.createClass({
  render() {
    const page = this.props.params.page;
    const {query} = this.props.location;
    const breadcrumb = query && query.breadcrumb;

    if (pages[page]) {
      return React.createElement(
        pages[page],
        {
          breadcrumb: breadcrumb
        }
      );
    }

    return (
      <PageContainer
        breadcrumb={breadcrumb}
      >
        你访问页面是: 「{this.props.params.page}」
      </PageContainer>
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
