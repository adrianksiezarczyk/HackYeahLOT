import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import qs from 'qs'

class StoriesApi {
    static async get({ sortColumnName, sortOrder, id = null, name = null, parentId = null, page = 1, pageSize = 10 }) {
        const query = qs.stringify(
            {
                currentPage: page,
                sortColumnName,
                sortOrder,
                pageSize,
                filter: {
                    id,
                    name,
                    parentId,
                },
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url('/v2/admin/stories')
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
    static async getDetails(storyId) {
        return await requestWithAuth
            .url(`/v2/admin/stories/${storyId}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .get()
            .json()
    }

    static async update(model) {
        await requestWithAuth
            .url(`/v2/admin/stories/${model.id}`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .put(model)
            .res()
    }
    static async add(model) {
        const response = await requestWithAuth
            .url('/v2/admin/stories')
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post(model)
            .json()
        return response.storyId
    }
    static async delete(storyId) {
        await requestWithAuth
            .url(`/v2/admin/stories/${storyId}`)
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

export default StoriesApi
