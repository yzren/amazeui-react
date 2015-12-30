import React from 'react';
import {
  Link,
} from 'react-router';
import {
  List,
  ListItem,
  Icon,
} from 'amazeui-react';

const navs = [
  {
    id: 'home',
    title: '首页',
    icon: 'home'
  },
  {
    id: 'group',
    title: '菜单组 1',
    icon: 'folder-o',
    subNav: 4,
  },
  {
    id: 'group',
    title: '菜单组 2',
    icon: 'folder-o',
    subNav: 5,
  },
  {
    id: 'about',
    title: '系统信息',
    icon: 'info'
  }
];

const Siderbar = React.createClass({
  getInitialState() {
    return {
      activeIndex: null
    };
  },

  handleClick(index, e) {
    e.preventDefault();

    if (this.state.activeIndex !== index) {
      this.setState({
        activeIndex: index
      });
    }
  },

  renderSubNavs(lenth) {
    let subNavs = [];

    for (let i = 0; i <= lenth; i++) {
      subNavs.push(
        <ListItem
          key={`subNav-${i}`}
        >
          <Link
            to={`page-${i}`}
            activeClassName="active"
          >
            <Icon icon="angle-right" />
            {` 子菜单 ${i}`}
          </Link>
        </ListItem>
      )
    }

    return (
      <List
        className="adm-sidebar-sub"
      >
        {subNavs}
      </List>
    );
  },

  renderItems() {
    return navs.map((nav, i) => {
      const {
        subNav,
        id,
        icon,
        title,
        } = nav;
      const subActive = this.state.activeIndex === i ? 'sub-active' : null;

      return (
        <ListItem
          key={`nav-${i}`}
          className={subActive}
        >
          <Link
            activeClassName="active"
            to={`/${id}`}
            onClick={subNav ? this.handleClick.bind(this, i) : null}
          >
            <Icon icon={subActive ? 'folder-open-o' : icon} />
            {` ${title}`}
          </Link>
          {subNav ? this.renderSubNavs(subNav) : null}
        </ListItem>
      );
    });
  },

  render() {
    return (
      <div
        className="adm-sidebar"
      >
        <List>
          {this.renderItems()}
        </List>
      </div>
    );
  }
});

export default Siderbar;
