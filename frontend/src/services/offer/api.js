import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'
import qs from 'qs'

class OfferApi {
    static async get({ pageSize = 12, currentPage = 1 }) {
        const query = qs.stringify(
            {
                currentPage,
                sortColumnName: '',
                sortOrder: '',
                pageSize,
            },
            { allowDots: true },
        )
        return await requestWithAuth
            .url(`/v2/admin/offer`)
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

    static async buyShop(offerId) {
        return await requestWithAuth
            .url(`/v2/admin/offer/buy`)
            .options({
                context: {
                    token: getToken(),
                    shopId: getShopId(),
                },
            })
            .post({ offerId })
            .json()
    }
}

export default OfferApi
