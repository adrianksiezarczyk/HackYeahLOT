import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import qs from 'qs'

class CategoryApi {
    static async getAliexpressCategories(parentCategoryId) {
        return await requestWithAuth
            .url(`/v2/admin/categories/aliexpress/${parentCategoryId || ''}`)
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
            })
    }

    static async getAllShopCategories() {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/all`)
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
            })
    }
    static async getShopCategories(parentId) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/children/${parentId || ''}`)
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
            })
    }

    static async getShopCategoriesPaginated({
        sortColumnName,
        sortOrder,
        filters,
        parentId = null,
        currentPage = 1,
        pageSize = 10,
    }) {
        const query = qs.stringify(
            {
                currentPage,
                sortColumnName,
                sortOrder,
                pageSize,
                filter: {
                   ...filters,
                    parentId,
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/categories/shop`)
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
                throw Error('Error in get shop categories paginated')
            })
    }

    static async getShopCategoryDetails(categoryId) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/${categoryId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async addShopCategoryDetails(model) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .res()
    }

    static async updateShopCategoryDetails(model) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/${model.id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }

    static async updateCategoriesOrder(model) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/order`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    
    static async deleteShopCategory(id) {
        return await requestWithAuth
            .url(`/v2/admin/categories/shop/${id}`)
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

export default CategoryApi
