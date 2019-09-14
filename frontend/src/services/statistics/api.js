import { requestWithAuth } from '../../utils/api'
import { getToken } from '../../utils/auth'
import { getShopId } from '../../utils/settings'

class StatisticsApi {
    static async getDashboard() {
        return await requestWithAuth
            .url(`/v2/admin/statistics/dashboard`)
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
}

export default StatisticsApi
