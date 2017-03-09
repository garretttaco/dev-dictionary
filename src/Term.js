import React, { Component, PropTypes as pt } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Definition from './Definition';
import AddDefinition from './AddDefinition';
import { Link } from 'react-router';
import CommonActions from './commonActions'

class Term extends Component {
  static propTypes = {
    term: pt.object.isRequired,
    hasLink: pt.bool,
  };

  state = {
    showAddDefinition: false,
  };

  toggleAdd = () => this.setState({ showAddDefinition: !this.state.showAddDefinition })

  render() {
    const { term, hasLink } = this.props;
    const { showAddDefinition } = this.state;
    return (
      <div className="term">
        <h3>
          {/* To reuse this component we add a conditional to check if we should display the link
          on the title or not */}
          {hasLink ?
          <Link to={`/terms/${term.name}`}>{term.name}</Link> :
            term.name
          }
        </h3>
        {term.definitions.map((definition, index) => {
          return <Definition key={definition.id} definition={definition} index={index + 1} />
        })}
        <div className="add-definition-section">
          <Button bsStyle="info" bsSize="xsmall" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add definition
          </Button>
          {showAddDefinition && <AddDefinition hide={this.toggleAdd} termId={term.id} />}
        </div>
      </div>
    );
  }
}

export default Term;
