import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Page } from 'tabler-react'
import withCurrentShop from '../components/HOCs/withCurrentShop'
import LoadingError from '../components/shared/LoadingError'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import { MAIN_CONFIGURATION_GROUPS } from '../constants'
//import useImmerState from '../hooks/useImmerState'
import routes from './settingsPage/routes'

// const initialState = Object.values(MAIN_CONFIGURATION_GROUPS).map(mainGroup => {
//     return { mainGroup, configurations: [] }
// })

const SettingsPage = props => {
    // const [configurationsGroups, setGroupConfigurations] = useImmerState(initialState)

    // const setGroupConfiguration = (group, configurations) => {
    //     setGroupConfigurations(draft => {
    //         const result = draft.find(c => c.group === group)
    //         if (result) result.configurations = configurations
    //     })
    // }

    // const getGroupConfiguration = mainGroup => {
    //     const result = configurationsGroups.find(c => c.mainGroup === mainGroup)
    //     if (!result) return null
    //     if (!result.configurations || !result.configurations.length) return null
    //     return result.configurations
    // }

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
                                    render={props => (
                                        <RouteComponent
                                            mainGroup={route.name}
                                            // updateConfigurationsState={setGroupConfiguration}
                                            // initialConfiguration={getGroupConfiguration(route.name)}
                                            {...props}
                                            {...route.props}
                                        />
                                    )}
                                />
                            )
                        })}
                        <Redirect to={`/settings/${MAIN_CONFIGURATION_GROUPS.PAYMENTS.toLowerCase()}`} />
                    </Switch>
                </Suspense>
            </LoadingError>
        </Page.Content>
    )
}

export default withCurrentShop(SettingsPage)
