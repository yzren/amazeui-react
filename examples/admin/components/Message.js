import React from 'react';
import PageContainer from '../components/PageContainer';

const Message = React.createClass({
  render() {
    return (
      <div>
        <h2>
          This is a message....
        </h2>
        <p>id: {this.props.params.id}</p>
      </div>
    );
  }
});

export default Message;
