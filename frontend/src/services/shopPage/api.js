import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class ShopPageApi {
    static async getAll() {
        return await requestWithAuth
            .url(`/v2/admin/shopPage/`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async update(model) {
        return await requestWithAuth
            .url(`/v2/admin/shopPage/`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async remove(pageId) {
        return await requestWithAuth
            .url(`/v2/admin/shopPage/${pageId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }
    static async selectPage(pageId) {
        return await requestWithAuth
            .url(`/v2/admin/shopPage/select/${pageId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put()
            .res()
    }
    static async addPage(newPage) {
        return await requestWithAuth
            .url(`/v2/admin/shopPage`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(newPage)
            .res()
    }
}

export default ShopPageApi
