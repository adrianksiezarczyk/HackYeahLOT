import { requestBase } from '../../utils/api'


class LotApi {
    static async logIn(email, password) {
        const userData = await requestBase
            .url('/v2/admin/auth')
            .post({ email, password })
            .json()
        return userData
    }

}

export default LotApi
