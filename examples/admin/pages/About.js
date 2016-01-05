import React from 'react';
import PageContainer from '../components/PageContainer';
import {
  Grid,
  Col,
  AvgGrid,
  Icon,
  Table,
  Badge,
  Dropdown,
  Panel,
  List,
  ListItem,
  Progress,
  ButtonGroup,
  Button,
  ButtonToolbar,
} from 'amazeui-react';

const About = React.createClass({
  render() {
    return (
      <PageContainer
        {...this.props}
      >
        <p>只是一个 Amaze UI React 后台模板骨架。欢迎完善。</p>
      </PageContainer>
    );
  }
});

export default About;
