import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class DocumentsApi {
    static async get() {
        return await requestWithAuth
            .url(`/v2/admin/documents`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async getDetails(id) {
        return await requestWithAuth
            .url(`/v2/admin/documents/${id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async updateContent(model) {
        return await requestWithAuth
            .url(`/v2/admin/documents/content`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async createContent(model) {
        return await requestWithAuth
            .url(`/v2/admin/documents/content`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .json()
    }
}

export default DocumentsApi
