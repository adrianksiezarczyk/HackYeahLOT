import React, { PureComponent } from 'react'
import styled from 'styled-components'
const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

class LoadingError extends PureComponent {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error(error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorWrapper>
                    <h2>Coś się zespsuło</h2>
                </ErrorWrapper>
            )
        }

        return this.props.children
    }
}

export default LoadingError
