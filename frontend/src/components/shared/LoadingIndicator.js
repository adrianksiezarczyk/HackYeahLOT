import React from 'react'
import styled from 'styled-components'
import { Dimmer } from 'tabler-react'

const LoaderInlineBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
    width: 100%;
    top: 25px;
    position: relative;
`

const LoadingIndicator = ({ className = '' }) => {
    return (
        <LoaderInlineBox className={className}>
            <Dimmer active loader />
        </LoaderInlineBox>
    )
}

export default LoadingIndicator
