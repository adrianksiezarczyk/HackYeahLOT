import React, { Suspense, useEffect } from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import LoadingIndicator from './components/shared/LoadingIndicator'
import DefaultLayout from './layouts/DefaultLayout'
import LoginLayout from './layouts/LoginLayout'
import RegisterLayout from './layouts/RegisterLayout'
import AuthApi from './services/auth/api'
import history from './services/history'
import ResetPasswordLayout from './layouts/ResetPasswordLayout'
import { GlobalStyle } from './GlobalStyle'

const App = () => {
    useEffect(() => {
        const checkTokenAsync = async () => {
            await AuthApi.checkToken()
        }
        checkTokenAsync()
    }, [])

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <GlobalStyle />
            <Router history={history}>
                <Switch>
                    <Route exact path="/register" component={RegisterLayout} />
                    <Route exact path="/login" component={LoginLayout} />
                    <Route path="/reset-password/:step?/:token?" component={ResetPasswordLayout} />
                    <Route path="/" component={DefaultLayout} />
                </Switch>
            </Router>
            <Suspense />
        </Suspense>
    )
}

export default App
