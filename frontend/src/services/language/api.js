import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class LanguageApi {
    static async get() {
        return await requestWithAuth
            .url(`/v2/admin/language`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
            .catch(error => {
                console.error(error.json)
            })
    }
}

export default LanguageApi
