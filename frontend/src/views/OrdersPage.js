import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoadingError from '../components/shared/LoadingError'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import routes from './ordersPage/routes'
import withCurrentShop from '../components/HOCs/withCurrentShop'

const OrdersPage = props => {
    return (
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
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </LoadingError>
    )
}

export default withCurrentShop(OrdersPage)
