import React from 'react';
import PageContainer from '../components/PageContainer';

// 获取组织事件
// https://developer.github.com/v3/activity/events/#list-public-events-for-an-organization

const MessageList = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },

  componentWillMount() {
    if (!window.fetch) {
      return console.error('fetch API is not supported!');
    }

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }

    fetch('https://api.github.com/orgs/amazeui/events')
      .then(checkStatus)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.updateDataSource(data);
      })
      .catch(error => {
        console.log('Request failed: ', error)
      });
  },

  updateDataSource(data) {
    console.log(data);
    this.setState({
      dataSource: data,
    })
  },

  render() {
    return (
      <div>
        <h2>
          MessageList
        </h2>
        <p>id: {this.props.params.id}</p>
      </div>
    );
  }
});

export default MessageList;
