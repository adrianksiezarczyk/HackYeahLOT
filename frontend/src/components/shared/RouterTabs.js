import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, withRouter } from 'react-router-dom'
import { Nav } from 'tabler-react'
import LoadingIndicator from './LoadingIndicator'

export const RouterTabLink = ({ title, to, namespace }) => {
    const { t } = useTranslation(namespace)
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Nav.Item value={t(title)} to={to} LinkComponent={withRouter(NavLink)} />
        </Suspense>
    )
}
