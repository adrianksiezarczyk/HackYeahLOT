import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Icon, Form } from 'tabler-react'
import Button from './Button'
import { useTranslation } from 'react-i18next'
import useOnOutsideClick from '../../hooks/useOnOutsideClick'

const DropdownWrapper = styled.div`
    width: 100%;
    text-align: right;
`
const SearchButton = styled(Button)`
    position: relative;
    max-width: 120px;
    padding: 0.25rem 2.5rem !important;
    i {
        position: absolute;
        right: 10px;
    }
`
const DropdownListAnchor = styled.div`
    position: relative;
`
const DropdownList = styled.div`
    position: absolute;
    z-index: 1;
    right: -10px;
    visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
    padding: 10px;
`
const DropdownItem = styled.div`
    margin-bottom: 2px;
`

const DropdownItemInput = styled(Form.Input)`
    width: 160px !important;
`

const SearchDropdown = ({ children }) => {
    const [isOpen, setOpen] = useState(false)
    const wrapperRef = useRef(null)

    const hideDropdown = useCallback(() => setOpen(false), [])
    useOnOutsideClick(wrapperRef, hideDropdown)

    const [t] = useTranslation('components')

    return (
        <DropdownWrapper ref={wrapperRef}>
            <SearchButton
                size="sm"
                color="grey"
                onClick={() => {
                    setOpen(prev => !prev)
                }}>
                {t('search')}
                <Icon name="chevron-down" />
            </SearchButton>
            <DropdownListAnchor>
                <DropdownList isVisible={isOpen}>{children}</DropdownList>
            </DropdownListAnchor>
        </DropdownWrapper>
    )
}

export default SearchDropdown

export const SearchDropdownOption = ({ placeholder, onChange }) => {
    return (
        <DropdownItem>
            <DropdownItemInput placeholder={placeholder} onChange={onChange} />
        </DropdownItem>
    )
}
