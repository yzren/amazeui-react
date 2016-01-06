import React from 'react';
import PageContainer from '../components/PageContainer';

const Messages = React.createClass({
  render() {
    return (
      <PageContainer
        {...this.props}
      >
        <h2>通知</h2>
        <hr />
        <ul>
          <li>通知 1</li>
          <li>通知 2</li>
        </ul>
        {this.props.children}
      </PageContainer>
    );
  }
});

export default Messages;
