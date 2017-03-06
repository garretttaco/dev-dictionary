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
        if (typeof manipulateProps === 'function') {
          const props = await manipulateProps({ data })
          this.setState({ props })
        }
        this.setState({
          data,
          loading: false,
          success: true,
        })
      } catch (error) {
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
  				{loading ?
            <h3>loading...</h3> :
            !loading && success ? <DatalessComponent {...manipulatedProps} data={data} /> :
            <Alert bsStyle="danger">We are having trouble loading this data.</Alert>}
        </div>
  		)
  	}
  }

export default FetchData
