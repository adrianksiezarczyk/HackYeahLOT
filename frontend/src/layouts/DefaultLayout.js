import React, { lazy, Suspense, useState } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { Page } from 'tabler-react'
import AccountValidityWarning from './defaultLayout/AccountValidityWarning'
import Header from './defaultLayout/Header'
import withValidity from '../components/HOCs/withValidity'
import Navigation from './defaultLayout/Navigation'
import LoadingError from '../components/shared/LoadingError'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import routes from '../routes'
import { isLoggedIn } from '../utils/auth'

const withLoaders = [
    ...routes.filter(r => r.loader),
    ...[].concat(...routes.filter(r => r.children && r.children.length > 0).map(route => route.children)),
]

const withNavbars = routes.filter(r => r.navbar)

const DefaultLayout = props => {
    const [collapse, setCollapse] = useState(true)
    const onMenuToggleClick = () => setCollapse(!collapse)

    const { isAccountValid, validityDate, isTrialPlan, validityError } = props
    return (
        <Page>
            <Page.Main>
                <AccountValidityWarning
                    validityDate={validityDate}
                    isTrialPlan={isTrialPlan}
                    validityError={validityError}
                />
                <Header {...{ onMenuToggleClick }} />
                <Navigation {...{ collapse }} history={props.history} />
                <LoadingError>
                    <Suspense fallback={<LoadingIndicator />}>
                        <Route exact path="/" render={() => <Redirect to="/products/explore" />} />
                        {withNavbars.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={route.navbar}
                                />
                            )
                        })}
                        {!isAccountValid && !window.location.pathname.startsWith(`/billing`) && (
                            <Redirect to={`/billing`} />
                        )}
                        {!isLoggedIn() && <Redirect to={`/login`} />}
                        {withLoaders.map((route, index) => {
                            const RouteComponent = lazy(route.loader)
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => <RouteComponent {...props} {...route.props} />}
                                />
                            )
                        })}
                    </Suspense>
                </LoadingError>
            </Page.Main>
        </Page>
    )
}

export default withRouter(withValidity(DefaultLayout))
