import produce from 'immer'
import LanguageApi from '../language/api'

export const common = {
    state: {
        languages: [],
    },
    reducers: {
        setLanguages(state, payload) {
            return produce(state, draft => {
                draft.languages = payload
            })
        },
    },
    effects: dispatch => ({
        async getLanguages(payload, rootState) {
            try {
                const response = await LanguageApi.get()
                this.setLanguages(response)
            } catch (error) {
                console.error(error.json)
            }
        },
    }),
}
