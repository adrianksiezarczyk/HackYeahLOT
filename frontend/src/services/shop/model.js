import produce from 'immer'
import { getShopInfo, setShopInfo } from '../../utils/settings'
import ShopApi from './api'

export const shop = {
    state: {
        current: getShopInfo(),
        all: null,
    },
    reducers: {
        setAllShops(state, payload) {
            return produce(state, draft => {
                draft.all = payload
            })
        },
        setCurrent(state, payload) {
            setShopInfo(payload)
            return produce(state, draft => {
                draft.current = payload
            })
        },
    },
    effects: dispatch => ({
        async getShops(payload, rootState) {
            try {
                const allShops = await ShopApi.get()
                this.setAllShops(allShops)
                if (!allShops.some(si => si.id === rootState.shop.current.id)) this.setCurrent(allShops[0])
            } catch (error) {
                console.error(error.json)
            }
        },
    }),
}
