import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Page } from 'tabler-react'
import LoadingError from '../components/shared/LoadingError'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import routes from './billingPage/routes'
import { useTranslation } from 'react-i18next'
import withCurrentShop from '../components/HOCs/withCurrentShop'

const BillingPage = props => {
    const { t } = useTranslation('billing-page')
    return (
        <Page.Content>
            <LoadingError>
                <Suspense fallback={<LoadingIndicator />}>
                    <Switch>
                        {routes.map((route, index) => {
                            const RouteComponent = lazy(route.loader)
                            return (
                                <Route
                                    key={index}
                                    path={props.match.url + route.path}
                                    exact={route.exact}
                                    name={t(route.name)}
                                    render={props => <RouteComponent {...props} {...route.props} t={t} />}
                                />
                            )
                        })}
                        <Redirect to="/billing/overview" />
                    </Switch>
                </Suspense>
            </LoadingError>
        </Page.Content>
    )
}

export default withCurrentShop(BillingPage)