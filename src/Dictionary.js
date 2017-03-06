import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import CommonActions from './commonActions'
import fetchData from './FetchData'

class Dictionary extends Component {
  state = {
    showAddTerm: false,
  };

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm })

  render() {
    const { showAddTerm } = this.state;
    const { data: terms } = this.props

    return (
      <div>
        <h2>Terms</h2>
        <Button bsStyle="success" onClick={this.toggleAdd}>
          <Glyphicon glyph="plus-sign" /> Add term
        </Button>
        {showAddTerm && <AddTerm hide={this.toggleAdd} />}
        <div className="terms">
          {terms.map(term => {
            // Do NOT do this here, use the _embed functionality below in the fetchData call
            const TermWithDefinitions = fetchData()(
              Term,
              `//localhost:4501/definitions?termId=${term.id}`
            )
            return <TermWithDefinitions key={term.id} term={term} hasLink />;
          })}
        </div>
      </div>
    );
  }
}

export default fetchData()(Dictionary, '//localhost:4501/terms_embed=definitions');
