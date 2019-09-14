import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class ConfigurationApi {
    static async getGroup(group) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/group/${group}`)
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
                throw Error('Error in get configurations')
            })
    }
    static async updateGroup(model) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/group`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }

    static async getNotificationEmail() {
        return await requestWithAuth
            .url(`/v2/admin/configuration/notificationEmail`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async updateNotificationEmail(email) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/notificationEmail`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put({ email })
            .res()
    }

    static async getCustomScripts() {
        return await requestWithAuth
            .url(`/v2/admin/configuration/scripts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async addScript(script) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/scripts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(script)
            .res()
    }
    static async updateScript(script) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/scripts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(script)
            .res()
    }
    static async deleteScript(scriptId) {
        return await requestWithAuth
            .url(`/v2/admin/configuration/scripts/${scriptId}`)
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

export default ConfigurationApi
