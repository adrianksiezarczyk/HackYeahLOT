import { TOKEN_INFO, TOKEN_STATUS } from '../../constants'
import { requestBase, requestWithAuth } from '../../utils/api'
import { getToken, getTokenExpiryDate, isLoggedIn, setLoginToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import history from '../history'

class AuthApi {
    static async logIn(email, password) {
        const userData = await requestBase
            .url('/v2/admin/auth')
            .post({ email, password })
            .json()
        return userData
    }

    static async register(registerUserModel) {
        const { captchaToken, ...model } = registerUserModel
        const userData = await requestBase
            .url('/auth/register/admin')
            .query({ captchaToken })
            .post(model)
            .json()
        return userData
    }

    static async refreshToken() {
        await requestWithAuth
            .url(`/v2/admin/auth/refresh`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post()
            .unauthorized(() => {
                throw new Error('Token has expired')
            })
            .json(res => {
                setLoginToken(res)
            })
    }

    static logOut() {
        localStorage.removeItem(TOKEN_INFO)
        history.push('/login')
    }

    static async checkToken() {
        if (!isLoggedIn()) return TOKEN_STATUS.ABSENT
        const expiryDate = getTokenExpiryDate()
        if (expiryDate < new Date()) {
            AuthApi.logOut()
            return TOKEN_STATUS.INVALID
        } else {
            //TODO why else?!
            try {
                await AuthApi.refreshToken()
                return TOKEN_STATUS.VALID
            } catch (error) {
                if (error.message === 'Network request failed') {
                    AuthApi.logOut()
                }
                //AuthApi.logOut()
                //return TOKEN_STATUS.INVALID
            }
        }
    }

    static async getAccountValidity() {
        return await requestWithAuth
            .url('/v2/admin/shopSets/validity')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async resetPassword(email) {
        return await requestBase
            .url(`/auth/admin/resetPassword/${email}`)
            .post()
            .res()
    }

    static async setNewPassword(model) {
        return await requestBase
            .url(`/auth/admin/setPassword`)
            .post(model)
            .res()
    }
}

export default AuthApi
