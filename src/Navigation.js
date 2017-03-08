import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import fetchData from './FetchData'

class Navigation extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  }

  render() {
    const { loggedInUser } = this.context;
    const { definitionCount } = this.props
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Dev Dictionary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {loggedInUser && <Navbar.Text>
              You are currently logged in as <Image className="nav-avatar" src={'/avatars/' + loggedInUser.avatarUrl} />
              {' '}
              <strong>{loggedInUser.name}</strong>
            </Navbar.Text>}
            {loggedInUser && <Navbar.Text>
              {definitionCount} definitions
            </Navbar.Text>}
            {loggedInUser && <LinkContainer to="/logout"><NavItem eventKey={2}>Logout</NavItem></LinkContainer>}
            {!loggedInUser && <LinkContainer to="/login"><NavItem eventKey={2}>Login</NavItem></LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function manipulateProps({ data = [] } = {}) {

  return {
    definitionCount: data.length,
  }
}

// The problem: We need to get the count of definitions that my user wrote.
// It might be argued that we should use Redux here. But it is not a huge issue to fetch the data again here. Maybe if we have a lot of data, but in that case we would implement pagination in our app and would not be able to use the length of the array of data on the client side anyway. So this becomes an issue with the limitations we have on the server. We would ideally have a server side route that would return to us the count of all the definitions that my user wrote.
export default fetchData(manipulateProps)(Navigation, '/definitions?userId=1')
