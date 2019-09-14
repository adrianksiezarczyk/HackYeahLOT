import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Icon } from 'tabler-react'
import { STATUSES } from '../../constants'

const HIDE_TIMEOUT = 3000

const StyledCardAlert = styled(Card.Alert)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledIcon = styled(Icon)`
    cursor: pointer;
`

export const SuccessCardAlert = ({ onHide, text, autoCanelDisabled }) => {
    if (!autoCanelDisabled) setTimeout(onHide, HIDE_TIMEOUT)
    return (
        <StyledCardAlert color="success">
            {text ? text : 'Success.'}
            <StyledIcon name="x" onClick={onHide} />
        </StyledCardAlert>
    )
}

export const FailureCardAlert = ({ onHide, text, autoCanelDisabled }) => {
    if (!autoCanelDisabled) setTimeout(onHide, HIDE_TIMEOUT)
    return (
        <StyledCardAlert color="danger">
            {text ? text : 'Error has occured.'}
            <StyledIcon name="x" onClick={onHide} />
        </StyledCardAlert>
    )
}

export const useAlert = () => {
    const [status, setStatus] = useState(null)

    const setNoStatus = () => setStatus(null)
    const setSuccessStatus = () => setStatus(STATUSES.SUCCESS)
    const setFailureStatus = () => setStatus(STATUSES.FAIL)

    return [status, setNoStatus, setSuccessStatus, setFailureStatus]
}

const CardStatusAlert = ({ status, onHide, failText, autoCanelDisabled }) => {
    if (!status) return null
    if (status === STATUSES.SUCCESS) return <SuccessCardAlert onHide={onHide} autoCanelDisabled={autoCanelDisabled} />
    else if (status === STATUSES.FAIL)
        return <FailureCardAlert onHide={onHide} text={failText || null} autoCanelDisabled={autoCanelDisabled} />
}
export default CardStatusAlert
