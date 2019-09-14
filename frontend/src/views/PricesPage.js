import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Page } from 'tabler-react'
import withCurrentShop from '../components/HOCs/withCurrentShop'
import LoadingError from '../components/shared/LoadingError'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import routes from './pricesPage/routes'

const PricesPage = props => {
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
                                    name={route.name}
                                    render={props => <RouteComponent {...props} {...route.props} />}
                                />
                            )
                        })}
                        <Redirect to={`/prices/commissions`} />
                    </Switch>
                </Suspense>
            </LoadingError>
        </Page.Content>
    )
}

export default withCurrentShop(PricesPage)
