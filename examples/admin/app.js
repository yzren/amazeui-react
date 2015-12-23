import React from 'react';
import {render} from 'react-dom';
import {
  Button
} from 'amazeui-react';

import './app.less';

var App = React.createClass({
  handleClick() {
    alert('clicked55xxx5');
  },

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
        >
          Test
        </Button>
        <p>Test xxxx</p>
      </div>
    );
  },
});

render(<App></App>, document.getElementById('root'));
