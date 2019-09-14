import produce from 'immer'
import { isLoggedIn } from '../../utils/auth'
import { setLoginToken } from '../../utils/auth'
import history from '../history'
import AuthApi from '../auth/api'

export const user = {
    state: {
        isLoggedIn: isLoggedIn(),
    },
    reducers: {
        setUserLoggedIn(state, payload) {
            return produce(state, draft => {
                draft.isLoggedIn = payload
            })
        },
    },
    effects: dispatch => ({
        async registerUser(registerUserModel) {
            try {
                const token = await AuthApi.register(registerUserModel)
                setLoginToken(token)
                this.setUserLoggedIn(true)
                history.push(`/`)
                return true
            } catch (error) {
                this.setUserLoggedIn(false)
                throw error
            }
        },

        async logIn({ email, password }) {
            await dispatch.auth.resetAccountValidity()
            try {
                const token = await AuthApi.logIn(email, password)
                setLoginToken(token)
                this.setUserLoggedIn(true)
                history.push(`/`)
                return true
            } catch (error) {
                console.error(error)
                this.setUserLoggedIn(false)
                throw error
            }
        },
        async logInFb(accessToken) {
            // const token = await UserApi.logInFb(accessToken)
            // setLoginToken(token)
            // store.dispatch.cart.fetchCartAsync()
            // this.setUserLoggedIn(true)
        },
        async logout() {
            // await UserApi.logout()
            // this.setUserLoggedIn(false)
        },
    }),
}
