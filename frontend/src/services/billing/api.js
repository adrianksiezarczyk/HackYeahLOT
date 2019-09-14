import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class BillingApi {
    static async GetInvoiceData() {
        const response = await requestWithAuth
            .url('/v2/admin/billing/invoice')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
        return response
    }
    static async UpdateInvoiceData(model) {
        await requestWithAuth
            .url('/v2/admin/billing/invoice')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async GetPlansPayments() {
        const response = await requestWithAuth
            .url('/v2/admin/billing/plans')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
        return response
    }
    static async GetPaymentDetails(planId, paymentId) {
        const response = await requestWithAuth
            .url(`/v2/admin/billing/details/${planId}/${paymentId ? paymentId : ''}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
        return response
    }
}

export default BillingApi
