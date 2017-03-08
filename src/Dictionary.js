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
            return <Term key={term.id} term={term} definitions={term.definitions} hasLink />;
          })}
        </div>
      </div>
    );
  }
}

export default fetchData()(Dictionary, '//localhost:4501/terms?_embed=definitions');
