import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import Term from './Term'
import fetchData from './FetchData'

class TermContainer extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  render() {
    // data is returned as an array of one term from FetchData,
    // so we destructure to the term object.
    const { data: [term] } = this.props
    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <Term term={term}/>
      </div>
    );
  }
}

// Here we apply part of the query string, but send a query prop to fetchData to pass the termName from the url that we get from the router component. This is another example where it might not be the best way to handle passing props to our HoC.
export default fetchData()(
  TermContainer,
  '//localhost:4501/terms?_limit=1&_embed=definitions'
)
