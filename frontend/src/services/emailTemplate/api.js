import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class EmailTemplateApi {
    static async getAll() {
        return await requestWithAuth
            .url(`/v2/admin/emailTemplate`)
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
            .url(`/v2/admin/emailTemplate/${id}`)
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
            .url(`/v2/admin/emailTemplate/content`)
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
            .url(`/v2/admin/emailTemplate/content`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async create(model) {
        return await requestWithAuth
            .url(`/v2/admin/emailTemplate`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async delete(id) {
        return await requestWithAuth
            .url(`/v2/admin/emailTemplate/${id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }
}

export default EmailTemplateApi
