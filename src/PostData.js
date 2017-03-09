import React, { Component, PropTypes } from 'react';
import CommonActions from './commonActions'
import { Alert } from 'react-bootstrap'
import formSerialize from 'form-serialize'

 const PostData = DatalessComponent =>
  class Wrapper extends Component {
    state = {
      data: null,
      errors: {},
      success: true,
      submitting: false,
    }

    post = async (values, url) => {
      this.setState({ submitting: true, error: null, submitSucceeded: false });
      try {
        const response = await CommonActions.fetchJson('/definitions', {
          method: 'POST',
          body: { ...values }
        })
        this.setState({ data: response, submitSucceeded: true })
      } catch (error) {
        this.setState({ error })
      }
      this.setState({ submitting: false })
    }

    render() {
      const { data, success, submitting } = this.state
      return (
        <div>
          <div>
            {submitting && !success ?
              <h3>submitting...</h3> :
              !submitting && success ? <DatalessComponent {...this.props} post={this.post} /> :
              <div>
                <Alert bsStyle="danger">We had trouble submitting this data.</Alert>
              </div>}
          </div>
        </div>
      )
    }
  }

export default PostData
