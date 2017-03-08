import React, { Component } from 'react';
import Navigation from './Navigation';
import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
  render() {
    const { logggedInUser } = this.props
    const query = logggedInUser ? `?userId=${logggedInUser.id}` : ''
    return (
      <div>
        <Navigation query={query}/>
        <Grid>
          <Row>
            <Col>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
