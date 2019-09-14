import React, { Suspense } from 'react'
import { Site } from 'tabler-react'
import { getUserEmail } from '../../utils/auth'
import ProfileDropdown from './header/ProfileDropdown'
import ShopSelect from './header/ShopSelect'
import LoadingIndicator from '../../components/shared/LoadingIndicator'

const Header = ({ onMenuToggleClick }) => {
    return (
        <Site.Header>
            <ShopSelect />
            <div className="d-flex order-lg-2 ml-auto">
                <Suspense fallback={<LoadingIndicator />}>
                    <ProfileDropdown name={getUserEmail()} />
                </Suspense>
            </div>
            <span className="header-toggler d-lg-none ml-3 ml-lg-0" onClick={() => onMenuToggleClick()}>
                <span className="header-toggler-icon" />
            </span>
        </Site.Header>
    )
}

export default Header
