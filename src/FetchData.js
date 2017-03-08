import React, { Component } from 'react'
import CommonActions from './commonActions'
import { Alert } from 'react-bootstrap'

const FetchData = manipulateProps => (DatalessComponent, url, options = {}) =>
  class HoC extends Component {
  	state ={
  		data: [],
      loading: true,
      success: false,
      props: {},
  	}

    async componentWillMount() {
      try {
        const data = await CommonActions.fetchJson(url)
        // If the user passed in a function to manipulate props, we call it.
        if (typeof manipulateProps === 'function') {
          const props = await manipulateProps({ data })
          // We can do this here because setStates are batched.
          this.setState({ props })
        }
        this.setState({
          data,
          loading: false,
          success: true,
        })
      } catch (error) {
        // Issue I ran into. This catches the DatalessComponents errors and then the following FetchData HoC does not continue with its process and gets stuck on loading. Anyone have any insight on that?
        // To reproduce go to the Term component and remove the _embed value. This will cause the Definitions component to error out and propagate that error here.
        // This error will say cannot map over property undefined.
        console.log('------------error', error)
        this.setState({
          loading: false,
          success: false,
        })
      }
    }

  	render() {
      const { loading, success, data, props } = this.state
      const manipulatedProps = { ...this.props, ...props }
  		return (
  			<div>
  				{loading && !success ?
            <h3>loading...</h3> :
            !loading && success ? <DatalessComponent {...manipulatedProps} data={data} /> :
            <Alert bsStyle="danger">We are having trouble loading this data.</Alert>}
        </div>
  		)
  	}
  }

export default FetchData
