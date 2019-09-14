import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Avatar, Dropdown, Icon } from 'tabler-react'
import AuthApi from '../../../services/auth/api'
import LanguageSelect from './LanguageSelect'
import { Link } from 'react-router-dom'

const DropdownItem = styled.div`
    cursor: pointer;
`
const StyledIcon = styled(Icon)`
    color: #9aa0ac;
    margin-right: 0.5rem;
    margin-left: -0.5rem;
    width: 1em;
    display: inline-block;
    text-align: center;
    vertical-align: -1px;
`
const LanguageSelectDropdownItem = styled.div`
    :active {
        background-color: unset !important;
    }
    :hover {
        background-color: unset !important;
    }
`

//TODO zrobić te elementy ręcznie jako Link, a nie a
const ProfileDropdown = ({ name, ...props }) => {
    const { t } = useTranslation('dashboard')
    const items = (
        <>
            <LanguageSelectDropdownItem className="dropdown-item">
                <LanguageSelect />
            </LanguageSelectDropdownItem>
            <Dropdown.ItemDivider />
            <Link to="profile" className="dropdown-item">
                <StyledIcon name="user-check" />
                {t('profile')}
            </Link>
            <Dropdown.ItemDivider />
            <DropdownItem className="dropdown-item" onClick={() => AuthApi.logOut()}>
                <StyledIcon name="log-out" />
                {t('logout')}
            </DropdownItem>
        </>
    )

    return (
        <Dropdown
            className={props.className}
            isNavLink
            triggerClassName="pr-0 leading-none"
            triggerContent={
                <>
                    <Avatar icon="user" />
                    <span className="ml-2 d-none d-lg-block">
                        <span className="text-default">{name}</span>
                    </span>
                </>
            }
            position="bottom-end"
            arrow={true}
            arrowPosition="right"
            items={items}
            toggle={false}
        />
    )
}

export default ProfileDropdown
