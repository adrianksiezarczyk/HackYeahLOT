import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import qs from 'qs'

class OrderApi {
    static async getOrders(model) {
        const query = qs.stringify(
            {
                currentPage: model.currentPage,
                sortColumnName: model.sortColumnName,
                sortOrder: model.sortOrder,
                pageSize: model.pageSize,
                filter: {
                    ...model.filters,
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/order`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .query(query)
            .get()
            .json()
    }
    static async getOrdersToExport(model) {
        const query = qs.stringify(
            {
                dateFrom: model.dateFrom,
                dateTo: model.dateTo,
                orderDateFrom: model.realizationDateFrom,
                orderDateTo: model.realizationDateTo,
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/order/export`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .query(query)
            .get()
            .json()
    }

    static async getOrderDetails(orderId) {
        return await requestWithAuth
            .url(`/v2/admin/order/${orderId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get(orderId)
            .json()
    }

    static async getOrderPayments(orderId) {
        return await requestWithAuth
            .url(`/v2/admin/order/payments/${orderId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get(orderId)
            .json()
    }

    static async getOrderComments(orderId) {
        return await requestWithAuth
            .url(`/v2/admin/order/comments/${orderId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get(orderId)
            .json()
    }
    static async updateDeliveryData(orderId, model) {
        return await requestWithAuth
            .url(`/v2/admin/order/delivery/${orderId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async updateStatus(orderId, statusId) {
        return await requestWithAuth
            .url(`/v2/admin/order/status/${orderId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put({ setOrderStatusId: statusId })
            .res()
    }
    static async updateOrderProduct(orderProductId, model) {
        return await requestWithAuth
            .url(`/v2/admin/order/product/${orderProductId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async addOrderProduct(orderId, product) {
        return await requestWithAuth
            .url(`/v2/admin/order/${orderId}/product`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(product)
            .res()
    }
    static async removeOrderProduct(orderProductId) {
        return await requestWithAuth
            .url(`/v2/admin/order/product/${orderProductId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }

    //TODO przenieśc do nowego serwisu
    static async getStatuses() {
        return await requestWithAuth
            .url(`/v2/admin/order/status`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
   
    }
    static async updateStatuses(statuses) {
        return await requestWithAuth
            .url(`/v2/admin/order/status`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(statuses)
            .res()
    }
    static async removeStatus(statusId) {
        return await requestWithAuth
            .url(`/v2/admin/order/status/${statusId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }
    static async addStatus(status) {
        return await requestWithAuth
            .url(`/v2/admin/order/status`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(status)
            .res()
    }
}

export default OrderApi
