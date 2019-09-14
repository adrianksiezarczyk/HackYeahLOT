import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../shared/LoadingIndicator'

const withValidity = WrappedComponent => {
    class WithValidity extends PureComponent {
        state = { isLoading: true }

        async componentDidMount() {
            try {
                await this.props.getAccountValidity()
            } catch (e) {
                console.error(e)
            }
            this.setState({ isLoading: false })
        }

        async componentWillUnmount() {
            await this.props.resetAccountValidity()
        }

        render() {
            if (this.state.isLoading) return <LoadingIndicator />
            return <WrappedComponent {...this.props} />
        }
    }

    return connect(
        state => ({
            isAccountValid: state.auth.isAccountValid,
            validityDate: state.auth.validityDate,
            isTrialPlan: state.auth.isTrialPlan,
            validityError: state.auth.validityError,
        }),
        dispatch => ({
            getAccountValidity: dispatch.auth.getAccountValidity,
            resetAccountValidity: dispatch.auth.resetAccountValidity,
        }),
    )(WithValidity)
}

export default withValidity
