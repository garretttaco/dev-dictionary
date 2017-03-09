import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';
import postData from './PostData'

class AddTerm extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
  };

  state = {
    name: '',
  }

  onChangeUpdateValue = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  createTerm = async e => {
    const { term } = this.state
    const userId = this.props.loggedInUser.id
    const { hide } = this.props
    // How do I get this newly posted data to the fetchData component which is a mini store.
    await this.props.post({ userId, name }, '/terms')
    hide()
  }

  render() {
    const { hide } = this.props;
    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Term
            </Col>
            <Col sm={10}>
              <FormControl
                name="name"
                value={this.state.name}
                onChange={this.onChangeUpdateValue}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createTerm}>
                Submit the term
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default postData(AddTerm)
