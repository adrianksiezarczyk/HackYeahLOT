import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class ChromeApi {
    static async importProduct(model) {
        return await requestWithAuth
            .errorType('text')
            .url(`/chrome/product`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .error(403, () => {
                throw new Error(403)
            })
            .res()
    }
}

export default ChromeApi
