import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class SubscriptionApi {
    static async get() {
        return await requestWithAuth
            .url(`/v2/admin/plan`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async pay(internalOrderId) {
        return await requestWithAuth
            .url(`/v2/admin/plan/pay`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post({ internalOrderId })
            .json()
    }
    static async buy(planId) {
        return await requestWithAuth
            .url(`/v2/admin/plan/buy`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post({ planId })
            .json()
    }
}

export default SubscriptionApi
