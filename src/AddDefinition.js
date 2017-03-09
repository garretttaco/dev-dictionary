import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Image, Well } from 'react-bootstrap';
import Select from 'react-select';
import jsonData from '../data/db';
import 'react-select/dist/react-select.css';
import fetchData from './FetchData'
import postData from './PostData'

// TODO: Fetch list of users from server via API.
const options = jsonData.users;

const userComponent = props => {
  const value = props.value ? props.value : props.option
  return (
    <div className="user-select-component" onClick={() => props.onSelect(value)}>
      <Image className="nav-avatar" src={'/avatars/' + value.avatarUrl} />
      {' '}
      <strong>{value.name}</strong>
    </div>
  )
};

class AddDefinition extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
  };

  state = {
    who: null,
    content: ''
  }

  onChangeUpdateValue = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  createDefinition = async e => {
    const { who: user, content } = this.state
    const userId = user.id
    const { termId, hide } = this.props
    // How do I get this newly posted data to the fetchData component which is a mini store.
    await this.props.post({ userId, content, termId }, '/definitions')
    hide()
  }

  selectWho = user => this.setState({ who: user });

  render() {
    const { hide } = this.props;
    const { who, content } = this.state;

    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Definition
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="textarea"
                placeholder="Add your definition"
                value={content}
                name="content"
                onChange={this.onChangeUpdateValue}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Who's definition?
            </Col>
            <Col sm={10}>
              <Select
                options={options}
                optionComponent={userComponent}
                ignoreCase
                onChange={this.selectWho}
                value={who}
                valueComponent={userComponent}
              />
              <HelpBlock>If you heard someone provide this definition, you can credit it to them. Otherwise, choose yourself.</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createDefinition}>
                Submit the definition
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default fetchData()(postData(AddDefinition), '/users')
