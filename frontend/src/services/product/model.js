import produce from 'immer'
import ProductApi from './api'

export const product = {
    state: {
        importList: null,
    },
    reducers: {
        setImportList(state, payload) {
            return produce(state, draft => {
                draft.importList = payload
            })
        },
    },
    effects: dispatch => ({
        async getImportList() {
            try {
                const data = await ProductApi.getImportListIds()
                this.setImportList(data)
            } catch (error) {
                console.error(error)
                console.error(error.json)
            }
        },
        async addToImportList(productId) {
            try {
                await ProductApi.addToImportList(productId)
                await this.getImportList()
            } catch (error) {
                console.error(error)
            }
        },
        async removeFromImportList(productId) {
            await ProductApi.removeFromImportList(productId)
            await this.getImportList()
        },
    }),
}
