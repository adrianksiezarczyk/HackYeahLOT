import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import qs from 'qs'
import { getShopId } from '../../utils/settings'
import { dedupe, throttlingCache } from 'wretch-middlewares'

class ProductApi {
    //TODO zrobić helper do tworzenia query, domyslne query/filter parametry - > object
    static async get({ categoryId, minPrice, maxPrice, pageSize = 12, page = 1, productId, aliExpressProductId }) {
        const query = qs.stringify(
            {
                currentPage: page,
                sortColumnName: 'Orders',
                sortOrder: 'desc',
                pageSize,
                filter: {
                    minPrice,
                    maxPrice,
                    aliExpressCategoryId: categoryId,
                    aliExpressProductId: aliExpressProductId || '',
                    productId: productId || '',
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/products`)
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
                console.error(error.json)
            })
    }

    static async getProductsLimit() {
        const query = qs.stringify(
            {
                filter: {
                    listMode: 'shop',
                    shopId: getShopId(),
                },
            },
            { allowDots: true },
        )
        const { totalItemsLimit, totalItems } = await requestWithAuth
            .url('/admin/product')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .query(query, false)
            .get()
            .json()
            .catch(error => {
                console.error(error.json)
            })
        return { totalItemsLimit, totalItems }
    }

    static async getShopProducts({ categoryId, pageSize = 12, page = 1, productId, aliExpressProductId }) {
        const query = qs.stringify(
            {
                currentPage: page,
                pageSize,
                filter: {
                    ShopCategoryId: categoryId || '',
                    AliExpressProductId: aliExpressProductId || '',
                    ProductId: productId || '',
                },
            },
            { allowDots: true },
        )

        const response = requestWithAuth
            .url(`/v2/admin/products/shop`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .query(query, false)
            .get()
            .onAbort(() => console.log('Aborted !'))

        return await response.json().catch(error => {
            console.error(error.json)
        })
    }
    static async getShopProductDetails(productId, languageId) {
        return await requestWithAuth
            .url(`/v2/admin/products/shop/${productId}/${languageId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }
    static async addToImportList(productId) {
        return await requestWithAuth
            .url(`/v2/admin/import`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post({
                productId,
            })
            .res()
    }
    static async removeFromImportList(productId) {
        return await requestWithAuth
            .url(`/v2/admin/import/${productId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .delete()
            .res()
    }
    static async addProductsToUpdate(productsIds) {
        return await requestWithAuth
            .url(`/v2/admin/products/updater`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(productsIds)
            .res()
    }

    static async addProductsToShop(model) {
        return await requestWithAuth
            .url(`/v2/admin/products/shop`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }

    static async getImportList({ pageSize = 12, page = 1, productId, aliExpressProductId }) {
        const query = qs.stringify(
            {
                currentPage: page,
                pageSize,
                filter: {
                    aliExpressProductId: aliExpressProductId || '',
                    productId: productId || '',
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/import`)
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

    static async getImportListIds() {
        return await requestWithAuth
            .middlewares([
                dedupe({
                    skip: () => false,
                }),
                throttlingCache({
                    throttle: 10000,
                }),
            ])
            .url(`/v2/admin/import/ids`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async getImportListProductDetails(productId, languageId) {
        return await requestWithAuth
            .url(`/v2/admin/import/${productId}/${languageId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async updateProduct(model) {
        return await requestWithAuth
            .url(`/v2/admin/products/shop/${model.productId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }

    static async updateMany(model) {
        return await requestWithAuth
            .url(`/v2/admin/products/many`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .patch(model)
            .res()
    }
}

export default ProductApi
