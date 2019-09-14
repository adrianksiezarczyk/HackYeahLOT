import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class ShopApi {
    static async get() {
        return await requestWithAuth
            .url(`/v2/admin/shops`)
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

    static async getDomain() {
        return await requestWithAuth
            .url(`/v2/admin/shops/domain`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async updateDomain(domainName) {
        return await requestWithAuth
            .url(`/v2/admin/shops/domain`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put({ domainName })
            .res()
    }
    static async getShopSetToken() {
        return await requestWithAuth
            .url(`/v2/admin/shops/token`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    
}

export default ShopApi
