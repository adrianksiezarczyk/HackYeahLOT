import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import qs from 'qs'
class PricesApi {
    static async getCommissions() {
        return await requestWithAuth
            .url(`/v2/admin/prices/commissions`)
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
                throw Error('Error in get commissions')
            })
    }
    static async updateCommission(model) {
        return await requestWithAuth
            .url(`/v2/admin/prices/commissions`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async addCommission(model) {
        return await requestWithAuth
            .url(`/v2/admin/prices/commissions`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async deleteCommission(id) {
        return await requestWithAuth
            .url(`/v2/admin/prices/commissions/${id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
            .catch(error => {
                console.error(error.json)
                throw Error('Error in delete commissions')
            })
    }
    static async getDiscounts({ sortColumnName, sortOrder, name = null, unusedOnly = false, page = 1, pageSize = 10 }) {
        const query = qs.stringify(
            {
                currentPage: page,
                sortColumnName,
                sortOrder,
                pageSize,
                filter: {
                    unusedOnly,
                    name,
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/prices/discounts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .query(query)
            .get()
            .json()
            .catch(error => {
                console.error(error, error.json)
                throw Error('Error in get discounts')
            })
    }
    static async updateDiscount(model) {
        return await requestWithAuth
            .url(`/v2/admin/prices/discounts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async addDiscount(model) {
        return await requestWithAuth
            .url(`/v2/admin/prices/discounts`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }
    static async deleteDiscount(id) {
        return await requestWithAuth
            .url(`/v2/admin/prices/discounts/${id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
            .catch(error => {
                console.error(error.json)
                throw Error('Error in delete discounts')
            })
    }
}

export default PricesApi
