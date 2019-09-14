import React from 'react'
import { Button as TablerButton, Icon } from 'tabler-react'
import { forceReloadOnUpdate } from '../../services/history'
import styled from 'styled-components'

const StyledTablerButton = styled(TablerButton)`
    ${props => (props.disabled ? `cursor: not-allowed !important` : `cursor: pointer`)}
`

const IconButton = styled.div`
    display: inline-block;
    margin-left: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    :hover {
        filter: brightness(50%);
    }
    i {
        color: #9e9e9e;
        vertical-align: middle;
    }
`

const Button = ({ onClick, ...props }) => {
    const enhancedOnClick = e => {
        if (forceReloadOnUpdate()) return
        if (typeof onClick === 'function') onClick(e)
    }
    return <StyledTablerButton onClick={enhancedOnClick} {...props} />
}
export default Button

export const PrimaryButton = ({ onClick, text, size, type, ...props }) => (
    <Button color="primary" size={size || 'sm'} className="ml-2" onClick={onClick} type={type || ''} {...props}>
        {text}
    </Button>
)

export const SecondaryButton = ({ onClick, text, size, type, className = '', ...props }) => (
    <Button
        color="secondary"
        size={size || 'sm'}
        className={`ml-2 ${className}`}
        onClick={onClick}
        type={type || ''}
        {...props}>
        {text}
    </Button>
)

export const RemoveButton = ({ ...props }) => {
    return (
        <IconButton {...props}>
            <Icon name="trash-2" />
        </IconButton>
    )
}

export const EditButton = ({ ...props }) => {
    const StyledButton = styled(SecondaryButton)`
        font-size: 87.5% !important;
        font-weight: 400 !important;
        padding: 5px 10px !important;
    `
    return <StyledButton {...props} />
}
