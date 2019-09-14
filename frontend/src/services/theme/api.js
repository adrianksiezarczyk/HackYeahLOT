import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class ThemeApi {
    static async get() {
        return await requestWithAuth
            .url(`/v2/admin/theme`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async updateStyles(model) {
        return await requestWithAuth
            .url(`/v2/admin/theme/styles`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async restoreDefaultStyles() {
        return await requestWithAuth
            .url(`/v2/admin/theme/styles/default`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put()
            .json()
    }
    static async uploadLogo(model) {
        return await requestWithAuth
            .url(`/v2/admin/theme/logo`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async uploadFavicon(model) {
        return await requestWithAuth
            .url(`/v2/admin/theme/favicon`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async getBanners() {
        return await requestWithAuth
            .url(`/v2/admin/theme/banner`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async addBanner(model) {
        return await requestWithAuth
            .url(`/v2/admin/theme/banner`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async deleteBanner(bannerId) {
        return await requestWithAuth
            .url(`/v2/admin/theme/banner/${bannerId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }
    static async updateBanner(bannerId, model) {
        return await requestWithAuth
            .url(`/v2/admin/theme/banner/${bannerId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
}

export default ThemeApi
